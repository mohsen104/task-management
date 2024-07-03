import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react'
import Swal from 'sweetalert2';
import Status from './Status';
import { realtimeTasks, realtimeTasksUser } from '@/utils/realtime';
import { useRouter } from 'next/router';

function TaskEdit({ isOpenTE, setIsOpenTE, title, desc, time, status, _id, link, setTasksReal, userid }) {

    const router = useRouter();

    const statusSelectedMain = status;

    const statusSelectedFilter = [
        { title: "Todo" },
        { title: "Doing" },
        { title: "Done" }
    ];

    const statusSelected = statusSelectedFilter.filter(item => item.title !== statusSelectedMain);

    statusSelected.unshift({ title: statusSelectedMain })

    const [selected, setSelected] = useState(statusSelected[0])

    async function taskEditFetch(values) {
        await fetch("https://task-management-nine-mu.vercel.app/api/tasks/taskid/" + _id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
            .then(() => {
                setIsOpenTE(false);
                if (router.pathname == "/") {
                    realtimeTasksUser(setTasksReal, userid);
                } else {
                    realtimeTasks(setTasksReal);
                }
                Swal.fire({
                    icon: "success",
                    title: "تسک مورد نظر با موفقیت ویرایش شد .",
                    confirmButtonText: "باشه",
                });
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
        <Transition appear show={isOpenTE} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpenTE(false)}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all py-12">
                                <Dialog.Title
                                    as="h3"
                                    className="text-center text-lg font-medium leading-6 text-gray-900"
                                >
                                    ویرایش تسک
                                </Dialog.Title>
                                <div className="mt-2">
                                    <Formik
                                        validate={(values) => {
                                            const errors = {};

                                            if (values.title.trim() === "") {
                                                errors.title = "لطفا عنوان تسک را وارد نمایید"
                                                document.querySelector('[name="title"]').classList.add("border-red-500")
                                            } else {
                                                document.querySelector('[name="title"]').classList.remove("border-red-500")
                                            }

                                            return errors;
                                        }}
                                        initialValues={{ _id: _id, title: title, desc: desc, time: time, link: link }}
                                        onSubmit={(values) => {
                                            values = Object.assign(values, { status: selected.title })
                                            taskEditFetch(values);
                                        }}
                                    >
                                        <Form className='flex flex-col items-start w-full'>
                                            <ErrorMessage name="title">{(msg) => <span className='text-red-500 text-sm'>{msg}</span>}</ErrorMessage>
                                            <div className='flex flex-row items-center justify-between gap-2 w-full'>
                                                <Field name='title' className='w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='عنوان' />
                                                <Status selected={selected} setSelected={setSelected} statusSelected={statusSelected} />
                                            </div>
                                            <Field as='textarea' name='desc' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='توضیحات' />
                                            <Field name='time' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='مدت زمان انجام' />
                                            <Field name='link' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='لینک' />
                                            <button type='submit' className='mt-4 shadow-lg shadow-[#D3D5FF] w-fit mx-auto px-8 text-center bg-[#444AD0] text-white rounded-md py-1.5 uppercase'>ویرایش</button>
                                        </Form>
                                    </Formik>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default TaskEdit