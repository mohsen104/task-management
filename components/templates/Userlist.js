import React from 'react'
import User from '../modules/User'

function Userlist({ userlist, onlineUsers }) {
    userlist?.map(user => {
        Object.assign(user, { isOnline: false });
        onlineUsers?.map(online => {
            if (user._id === online.userId) {
                Object.assign(user, { isOnline: true });
            }
        })
    })
    return (
        <>
            <div className='ml-6 mb-6 bg-white flex flex-col p-4 col-span-11 row-span-5 overflow-y-scroll overscroll gap-6 rounded-xl shadow-lg'>
                <div className='flex flex-col gap-6'>
                    {
                        (userlist.length) ?
                            userlist.map((user, index) => (
                                <User key={user._id} {...user} />
                            ))
                            :
                            <div className='h-full flex items-center justify-center'>
                                <p>هیچ تسکی برای این کاربر تعریف نشده !</p>
                            </div>
                    }
                </div>
            </div >
        </>
    )
}

export default Userlist