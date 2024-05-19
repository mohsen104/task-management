import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

function Logout({ isOpen, setIsOpen }) {
    const router = useRouter();
    async function logoutFetch() {
        await fetch("http://localhost:3000/api/auth/logout/")
            .then(() => {
                setIsOpen(false)
                router.push("/login");
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "مشکلی در ارتباط با سرور پیش آمده !",
                    confirmButtonText: "باشه",
                });
            })
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                                    خروج
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-center text-sm text-gray-500">
                                        آیا از خروج حساب کاربری خود مطمئن هستید ؟
                                    </p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className='grid grid-cols-2 gap-2.5 w-[50%]'>
                                        <button onClick={() => logoutFetch()} className='mt-6 w-full text-center bg-red-500 text-white rounded-md py-1.5 uppercase'>حذف</button>
                                        <button onClick={() => setIsOpen(false)} className='mt-6 w-full text-center text-black rounded-md py-1.5 uppercase'>لغو</button>
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

export default Logout