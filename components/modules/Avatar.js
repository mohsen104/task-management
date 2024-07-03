import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Swal from 'sweetalert2';

function Avatar({ isOpenAv, setIsOpenAv, _id, avatarDefault, setAvatarDefault }) {
    const [avatarValue, setAvatarValue] = useState(avatarDefault);
    async function avatarFetch() {
        const res = await fetch("https://task-management-nine-mu.vercel.app/api/users/avatar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: _id, avatar: avatarValue })
        })
        if (res.status === 200) {
            setIsOpenAv(false)
            setAvatarDefault(avatarValue);
            Swal.fire({
                icon: "success",
                title: "آواتار شما با موفقیت ویرایش شد .",
                confirmButtonText: "باشه",
            });
        } else if (res.status <= 500) {
            Swal.fire({
                icon: "error",
                title: "مشکلی در ارتباط با سرور پیش آمده !",
                confirmButtonText: "باشه",
            });
        }
    }
    return (
        <Transition appear show={isOpenAv} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpenAv(false)}>
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
                                    آواتار خود را انتخاب کنید :
                                </Dialog.Title>
                                <div className="mt-4 flex flex-row items-center justify-center gap-4">
                                    <div>
                                        <input type="radio" name='avatar' id='avatar1' hidden value={"avatar1"} checked={avatarValue == "avatar1"} onChange={(e) => setAvatarValue(e.target.value)} />
                                        <label htmlFor="avatar1">
                                            <img src="avatar1.avif" alt="" className='cursor-pointer w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-full' />
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" name='avatar' id='avatar2' hidden value={"avatar2"} checked={avatarValue == "avatar2"} onChange={(e) => setAvatarValue(e.target.value)} />
                                        <label htmlFor="avatar2">
                                            <img src="avatar2.avif" alt="" className='cursor-pointer w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-full' />
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" name='avatar' id='avatar3' hidden value={"avatar3"} checked={avatarValue == "avatar3"} onChange={(e) => setAvatarValue(e.target.value)} />
                                        <label htmlFor="avatar3">
                                            <img src="avatar3.avif" alt="" className='cursor-pointer w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-full' />
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" name='avatar' id='avatar4' hidden value={"avatar4"} checked={avatarValue == "avatar4"} onChange={(e) => setAvatarValue(e.target.value)} />
                                        <label htmlFor="avatar4">
                                            <img src="avatar4.avif" alt="" className='cursor-pointer w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-full' />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className='grid grid-cols-2 gap-2.5 w-[50%]'>
                                        <button onClick={() => avatarFetch()} className='mt-6 w-full text-center bg-teal-500 text-white rounded-md py-1.5 uppercase'>تایید</button>
                                        <button onClick={() => setIsOpenAv(false)} className='mt-6 w-full text-center text-black rounded-md py-1.5 uppercase'>لغو</button>
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

export default Avatar