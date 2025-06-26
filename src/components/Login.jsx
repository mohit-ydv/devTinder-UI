import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [emailId, setEmailId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoginForm, setIsLoginForm] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            const res = await axios.post(BASE_URL + '/login', {
                emailId,
                password
            }, {
                withCredentials: true // This is important to include cookies in the request
            });
            dispatch(addUser(res.data));
            navigate('/');
        } catch (error) {
            setError(error?.response?.data?.message || "Login failed");
        }
    };

    const handleSignUp = async (e) => {
        try {
            const res = await axios.post(BASE_URL + '/signup', {
                firstName,
                lastName,
                emailId,
                password
            }, {
                withCredentials: true
            });
            dispatch(addUser(res.data.data));
            navigate('/profile');
        } catch (error) {
            setError(error?.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className='flex justify-center items-center my-10'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
                    <div>
                        {!isLoginForm &&
                            <>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label my-2">
                                        <span className="label-text">First Name</span>
                                    </div>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label my-2">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="" className="input input-bordered w-full max-w-xs" />
                                </label>
                            </>}
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label my-2">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label my-2">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center m-2 w-full">
                        <button onClick={isLoginForm ? handleLogin : handleSignUp} className="btn btn-primary">{isLoginForm ? 'Login' : 'Sign Up'}</button>
                    </div>
                    <p className='m-auto cursor-pointer' onClick={() => setIsLoginForm(!isLoginForm)}>
                        {
                            isLoginForm ? 'New User? Sign up here' : 'Existing User? Login here'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login
