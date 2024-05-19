import React, { useState } from 'react'
import Task from '../modules/Task'
import { FaPlus } from 'react-icons/fa6';
import TaskNew from '../modules/TaskNew';

function Tasks({ tasks, members, setTasksReal, role, _id }) {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TaskNew members={members} isOpen={isOpen} setIsOpen={setIsOpen} setTasksReal={setTasksReal} role={role} _id={_id} />
      <div className='ml-6 mb-6 bg-white flex flex-col p-4 col-span-11 row-span-5 overflow-y-scroll overscroll gap-6 rounded-xl shadow-lg'>
        <div className='flex flex-row items-center'>
          <div onClick={() => setIsOpen(true)} className='flex items-center justify-center py-2.5 px-3.5 bg-[#575DE8] fill-white text-white gap-1 rounded-full cursor-pointer shadow-lg shadow-[#D3D5FF]'>
            <p>تسک جدید</p>
            <FaPlus className='fill-white' size={24} />
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          {
            (tasks.length) ?
              tasks.map(task => (
                <Task key={task._id} {...task} setTasksReal={setTasksReal} role={role} />
              ))
              :
              <div className='h-full flex items-center justify-center'>
                <p>هیچ تسکی برای این کاربر تعریف نشده !</p>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default Tasks