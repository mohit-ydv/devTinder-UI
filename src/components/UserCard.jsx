import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, age, about, gender, photoUrl} = user;
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
                {age && gender && <p>{age +" "+ gender}</p>}
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-secondary">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
