import React, { useState } from 'react'
import { FiLogOut } from "react-icons/fi";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logout from '../modules/Logout';
import Avatar from '../modules/Avatar';

function Navbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAv, setIsOpenAv] = useState(false);
    const [avatarDefault, setAvatarDefault] = useState(user.avatar);
    const router = useRouter();
    let roleTitle;
    switch (user.role) {
        case "USER":
            roleTitle = "کاربر"
            break;
        case "ADMIN":
            roleTitle = "ادمین"
            break;
        case "MASTER":
            roleTitle = "مستر"
            break;
    }
    return (
        <>
            <Avatar _id={user._id} avatarDefault={avatarDefault} setAvatarDefault={setAvatarDefault} isOpenAv={isOpenAv} setIsOpenAv={setIsOpenAv} />
            <Logout isOpen={isOpen} setIsOpen={setIsOpen} />
            <nav className="max-lg:px-5 max-lg:flex-col max-sm:row-span-1 max-lg:row-span-2  shadow-md col-span-full row-span-1 py-4 px-10 flex flex-row items-center justify-between bg-white">
                <Link href={"/"}><img src={router.pathname == "/login" ? "logo-white.png" : "logo.png"} alt="" className='h-12' /></Link>
                <div className='flex flex-row gap-4 items-center'>
                    <div onClick={() => setIsOpenAv(true)} className='flex flex-row items-center bg-gray-50 rounded-full cursor-pointer'>
                        <div className='flex flex-col items-end pl-2.5 pr-4'>
                            <p className='font-semibold text-md'>{user?.firstname} {user?.lastname}</p>
                            <p className='text-sm'>{roleTitle}</p>
                        </div>
                        <img className='w-14 rounded-full' src={`${avatarDefault}.avif`} alt="" />
                    </div>
                    <div onClick={() => setIsOpen(true)} data-tooltip-id="my-tooltip" data-tooltip-content="خروج" className='bg-red-400 rounded-md p-2 cursor-pointer'>
                        <FiLogOut className='stroke-white cursor-pointer' size={24} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar