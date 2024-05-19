import { Popover, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { MdEdit } from 'react-icons/md'
import { IoMdMore } from "react-icons/io";
import { MdVisibility } from "react-icons/md";
import TaskDelete from './TaskDelete'
import TaskEdit from './TaskEdit'
import TaskShow from './TaskShow';

export default function TaskMore({ title, desc, time, status, _id, setTasksReal, role, user, highlight, highlightColor, link, updatedAt }) {
    let [isOpenTD, setIsOpenTD] = useState(false);
    let [isOpenTE, setIsOpenTE] = useState(false);
    let [isOpenTS, setIsOpenTS] = useState(false);

    let solutions = [
        {
            name: 'مشاهده',
            href: () => setIsOpenTS(true),
            icon: IconOne,
        },
        {
            name: 'ویرایش',
            href: () => setIsOpenTE(true),
            icon: IconTwo,
        },
        {
            name: 'حذف',
            href: () => setIsOpenTD(true),
            icon: IconThree,
        },
    ];

    if (role === "USER") {
        solutions = [
            {
                name: 'مشاهده',
                href: () => setIsOpenTS(true),
                icon: IconOne,
            },
            {
                name: 'ویرایش',
                href: () => setIsOpenTE(true),
                icon: IconTwo,
            },
        ];
    }

    return (
        <>
            <TaskShow isOpenTS={isOpenTS} setIsOpenTS={setIsOpenTS} title={title} desc={desc} time={time} status={status} link={link} highlight={highlight} highlightColor={highlightColor} user={user} updatedAt={updatedAt} />
            <TaskDelete isOpenTD={isOpenTD} setIsOpenTD={setIsOpenTD} _id={_id} setTasksReal={setTasksReal} userid={user._id} />
            <TaskEdit title={title} desc={desc} time={time} status={status} isOpenTE={isOpenTE} setIsOpenTE={setIsOpenTE} _id={_id} setTasksReal={setTasksReal} userid={user._id} />
            <Popover className="relative w-fit">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className="bg-sky-400 rounded-md p-2 cursor-pointer text-white">
                            <IoMdMore size={28} />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-full z-10 mt-2 w-fit max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                    <div className="relative grid bg-white p-2">
                                        {solutions.map((item) => (
                                            <div
                                                onClick={item.href}
                                                key={item.name}
                                                className="cursor-pointer flex items-center rounded-lg p-1 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                            >
                                                <div className="flex h-8 w-10 shrink-0 items-center justify-center text-black">
                                                    <item.icon aria-hidden="true" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </>
    )
}

function IconOne() {
    return (
        <MdVisibility className='stroke-red-500' size={24} />
    )
}

function IconTwo() {
    return (
        <MdEdit className='stroke-red-500' size={24} />
    )
}

function IconThree() {
    return (
        <LuTrash2 className='stroke-red-500' size={24} />
    )
}
