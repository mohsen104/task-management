import React from 'react'
import Task from '../modules/Task'

function Tasklist({ tasks, role, setTasksReal }) {
    return (
        <>
            <div className='ml-6 mb-6 bg-white flex flex-col p-4 col-span-11 row-span-5 overflow-y-scroll overscroll gap-6 rounded-xl shadow-lg'>
                <div className='flex flex-col gap-6'>
                    {
                        (tasks.length) ?
                            tasks.map(task => (
                                <Task key={task._id} {...task} role={role} setTasksReal={setTasksReal} />
                            ))
                            :
                            <div className='h-full flex items-center justify-center'>
                                <p>هیچ تسکی تعریف نشده !</p>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Tasklist