import React from 'react'

function User({ firstname, lastname, email, createdAt, role, avatar, _id, isOnline }) {
    
    const dateAt = new Intl.DateTimeFormat("fa-IR").format(new Date(createdAt))
    return (
        <div className='h-fit py-4 px-5 grid grid-cols-4 items-center justify-between gap-4 rounded-xl shadow-lg'>
            <div className='flex flex-row items-center gap-2.5'>
                <div className={`${isOnline ? "online" : ""}`}>
                    <img src={`${avatar}.avif`} alt="" className={`w-10 h-10 rounded-full`}></img>
                </div>
                <p className='font-semibold text-lg'> {firstname} {lastname}</p>
            </div>
            <p>{email}</p>
            <p className='rounded-md p-2 text-black w-fit mx-auto'>{dateAt}</p>
            <p className='rounded-md p-2 bg-violet-500/15 text-violet-500 w-fit mx-auto'>{role}</p>
        </div>
    )
}

export default User