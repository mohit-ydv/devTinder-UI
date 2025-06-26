import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector(store => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });
            dispatch(addConnections(res.data));
        } catch (error) {
            console.log('Error fetching connections: ', error.message);
        }
    };

    React.useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <h1 className='flex justify-center my-10'>No connections found.</h1>

    return connections && (<div className='text-center'>
        <h1 className='text-bold text-2xl m-5'>Connections</h1>
        <div className='flex m-10 gap-4'>
            {
                connections.map((user, i) => (
                    <div key={i} className="card bg-base-300 w-96 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={user.photoUrl}
                                alt="Shoes"
                                className="rounded-full w-60 h-60 object-cover border"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
                            <p>{user.about}</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Say Hi</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    )
}

export default Connections
