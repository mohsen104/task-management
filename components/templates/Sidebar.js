import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdSpaceDashboard } from "react-icons/md";
import { MdChecklist } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";

function Sidebar({ role }) {
    const router = useRouter();
    return (
        <div className='max-lg:col-span-full max-lg:row-span-1 max-lg:flex-row max-lg:items-center max-lg:justify-center max-lg:m-3 mr-6 mb-6 bg-white list-none font-normal gap-6 col-start-1 col-end-2 row-start-2 row-end-7 py-6 flex flex-col rounded-xl shadow-lg'>
            <Link data-tooltip-id="my-tooltip" data-tooltip-content="داشبورد" href="/" className={router.pathname == "/" ? "cursor-pointer flex justify-center border-r-4 border-r-[#444AD0] max-lg:drop-shadow-custom max-lg:border-r-0" : "max-lg:opacity-25 cursor-pointer flex justify-center border-r-4 border-r-white"}><MdSpaceDashboard size={28} className='max-lg:w-10 max-lg:h-10' /></Link>
            <Link data-tooltip-id="my-tooltip" data-tooltip-content="لیست کاربران" href="/userlist" className={router.pathname == "/userlist" ? "cursor-pointer flex justify-center border-r-4 border-r-[#444AD0] max-lg:drop-shadow-custom max-lg:border-r-0" : "max-lg:opacity-25 cursor-pointer flex justify-center border-r-4 border-r-white"}><MdChecklist size={28} className='max-lg:w-10 max-lg:h-10' /></Link>
            <Link data-tooltip-id="my-tooltip" data-tooltip-content="لیست تسک ها" href="/tasklist" className={router.pathname == "/tasklist" ? "cursor-pointer flex justify-center border-r-4 border-r-[#444AD0] max-lg:drop-shadow-custom max-lg:border-r-0" : "max-lg:opacity-25 cursor-pointer flex justify-center border-r-4 border-r-white"}><FaUsersGear size={28} className='max-lg:w-10 max-lg:h-10' /></Link>
            {
                role == "MASTER" ?
                    <Link data-tooltip-id="my-tooltip" data-tooltip-content="دسترسی کابران" href="/useraccess" className={router.pathname == "/useraccess" ? "cursor-pointer flex justify-center border-r-4 border-r-[#444AD0] max-lg:drop-shadow-custom max-lg:border-r-0" : "max-lg:opacity-25 cursor-pointer flex justify-center border-r-4 border-r-white"}><MdVerifiedUser size={28} className='max-lg:w-10 max-lg:h-10' /></Link>
                    : ""
            }
        </div>
    )
}

export default Sidebar