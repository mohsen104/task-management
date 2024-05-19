import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

function TaskShow({ isOpenTS, setIsOpenTS, title, desc, time, link, highlight, highlightColor, updatedAt }) {
    const dateAt = new Intl.DateTimeFormat("fa-IR").format(new Date(updatedAt))
    return (
        <Transition appear show={isOpenTS} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpenTS(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-center text-lg font-medium leading-6 text-gray-900"
                                >
                                    مشاهده تسک
                                </Dialog.Title>
                                <div className="mt-2 flex flex-col gap-2">
                                    <div className='flex flex-row items-start gap-2 px-2 py-1.5 rounded-lg bg-gray-50'>
                                        <p className='font-semibold whitespace-pre'>عنوان :</p>
                                        <p>{title}</p>
                                    </div>
                                    <div className='flex flex-row items-start gap-2 px-2 py-1.5 rounded-lg bg-gray-50'>
                                        <p className='font-semibold whitespace-pre'>توضیحات :</p>
                                        <p className='text-start'>{desc}</p>
                                    </div>
                                    <div className='flex flex-row items-start gap-2 px-2 py-1.5 rounded-lg bg-gray-50'>
                                        <p className='font-semibold whitespace-pre'>هایلایت :</p>
                                        <p>{highlight}</p>
                                        <p>( {highlightColor} )</p>
                                    </div>
                                    <div className='flex flex-row items-start gap-2 px-2 py-1.5 rounded-lg bg-gray-50'>
                                        <p className='font-semibold whitespace-pre'>لینک :</p>
                                        <a href={link} target='_blank' className='text-blue-500'>{link}</a>
                                    </div>
                                    <div className='flex flex-row items-start gap-2 px-2 py-1.5 rounded-lg bg-gray-50'>
                                        <p className='font-semibold whitespace-pre'>زمان :</p>
                                        <p>{time} دقیقه</p>
                                    </div>
                                    <div className='flex flex-row items-start gap-2 px-2 py-1.5 rounded-lg bg-gray-50'>
                                        <p className='font-semibold whitespace-pre'>تاریخ :</p>
                                        <p>{dateAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className='grid place-items-center w-[25%]'>
                                        <button onClick={() => setIsOpenTS(false)} className='mt-6 w-full text-center bg-red-500 text-white rounded-md py-1.5 uppercase'>بستن</button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default TaskShow