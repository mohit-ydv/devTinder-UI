import NavBar from './NavBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import Feed from './Feed';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((store) => store.user);
    const fetchUser = async () => {
        if(userData) return;
        try {
            const res = await axios.get(BASE_URL + '/profile/view', {
                withCredentials: true
            });
            dispatch(addUser(res.data));
        } catch (error) {
            if(error.status === 401){
                navigate('/login');
            }
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div>
            <NavBar />
           {location.pathname === '/' && <Feed />}
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default Body;

