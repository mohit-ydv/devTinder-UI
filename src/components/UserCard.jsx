import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const UserCard = ({ user }) => {
    const { _id, firstName, age, about, gender, photoUrl } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img className='mx-4 rounded-lg'
                    src={photoUrl}
                    alt="profile pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName}</h2>
                <p>{about}</p>
                {age && gender && <p>{age + ", " + gender}</p>}
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-primary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
