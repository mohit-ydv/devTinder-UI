import React from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);
    const [age, setAge] = React.useState(user.age);
    const [about, setAbout] = React.useState(user.about);
    const [gender, setGender] = React.useState(user.gender);
    const [photoUrl, setPhotoUrl] = React.useState(user.photoUrl);
    const [error, setError] = React.useState('');
    const [toast, setToast] = React.useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError('');
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName, lastName, age, about, gender, photoUrl
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setToast(true);
            setTimeout(() => {
                setToast(false)
            }, 3000);
        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <div className='flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4'>
            {/* Edit Form */}
            <div className="card bg-base-300 w-full max-w-md shadow-xl p-4">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4">Edit Profile</h2>
                    <label className="form-control w-full mb-3">
                        <span className="label-text">First Name</span>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-3">
                        <span className="label-text">Last Name</span>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-3">
                        <span className="label-text">Age</span>
                        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-3">
                        <span className="label-text">Gender</span>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-3">
                        <span className="label-text">About</span>
                        <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full mb-5">
                        <span className="label-text">Photo URL</span>
                        <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input input-bordered w-full" />
                    </label>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button onClick={saveProfile} className="btn btn-primary w-full">Save Profile</button>
                    </div>
                </div>
            </div>

            {/* Live Preview */}
            <div className="flex justify-center w-full max-w-md">
                <UserCard user={{ firstName, lastName, age, about, gender, photoUrl }} />
            </div>
            {toast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </div>
    );
};

export default EditProfile;
