import React from 'react'
import TaskMore from './Popover'
import { useRouter } from 'next/router';

function Task({ _id, title, desc, user, link, highlight, highlightColor, time, status, setTasksReal, role, updatedAt }) {
    const router = useRouter();
    const setTime = time < 60 ? `${time} دقیقه` : `${Math.floor(time / 60)}:${time % 60} ساعت`;
    let bgStatus, colorStatus;
    switch (status) {
        case "Todo":
            bgStatus = "bg-gray-600/10"
            colorStatus = "text-gray-600"
            break;
        case "Doing":
            bgStatus = "bg-orange-600/10"
            colorStatus = "text-orange-600"
            break;
        case "Done":
            bgStatus = "bg-emerald-600/10"
            colorStatus = "text-emerald-600"
            break;

        default:
            break;
    }
    return (
        <div className={`h-fit py-4 px-5 grid ${router.pathname == "/tasklist" ? "grid-cols-6" : "grid-cols-5"} items-center justify-between gap-4 rounded-xl shadow-lg`}>
            <p className='w-fit font-semibold text-lg'>{title}</p>
            {highlight ? <p style={{ backgroundColor: highlightColor + "1a", color: highlightColor }} className='mx-auto w-fit rounded-md p-2 text-white'>{highlight}</p> : <p></p>}
            <p className={`${bgStatus} mx-auto w-fit rounded-md p-2 ${colorStatus}`}>{status}</p>
            <p className='w-fit mx-auto'>{setTime ? `${setTime}` : ""}</p>
            {
                router.pathname == "/tasklist"
                    ?
                    <p className='w-fit mx-auto'>{user.firstname} {user.lastname}</p>
                    : ""
            }
            <div className='flex justify-end'>
                <TaskMore title={title} desc={desc} time={time} status={status} link={link} _id={_id} setTasksReal={setTasksReal} role={role} user={user} highlight={highlight} highlightColor={highlightColor} updatedAt={updatedAt} />
            </div>
        </div>
    )
}

export default Task