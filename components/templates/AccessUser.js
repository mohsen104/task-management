import React, { useState } from 'react'
import Access from '../modules/Access'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Role from '../modules/Role';
import Swal from 'sweetalert2';

function AccessUser({ userlist }) {
  console.log(userlist);
  const roles = ["USER", "ADMIN"];
  const [selected, setSelected] = useState(userlist[0]);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  async function accessFetch() {
    const res = await fetch("https://task-management-nine-mu.vercel.app/api/users/accessuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: selected._id, role: selectedRole })
    })
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "دسترسی کاربر مورد نظر با موفقیت ویرایش شد",
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
    <div className='max-lg:m-3 max-lg:mt-0 max-lg:col-span-full ml-6 mb-6 bg-white flex flex-col p-4 col-span-11 row-span-5 overflow-y-scroll overscroll gap-6 rounded-xl shadow-lg'>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-between max-lg:py-4'>
          <p className='text-2xl font-semibold mb-4 max-lg:mb-0'>سلام !</p>
          <div onClick={() => accessFetch()} className="w-fit flex items-center justify-center py-2.5 px-8 bg-[#575DE8] fill-white text-white gap-1 rounded-full cursor-pointer shadow-lg shadow-[#D3D5FF]">
            <p>ثبت</p>
            <IoIosCheckmarkCircleOutline size={20} />
          </div>
        </div>
        <p className='text-md mb-1 text-gray-500'>
          اینجا پنل تعیین سطح دسترسی کاربران هست
        </p>
        <p className='text-md mb-1 text-gray-500'>
          به این پنل فقط و فقط شما دسترسی دارید
        </p>
        <p className='text-md mb-1 text-gray-500'>
          لطفا در مشخص کردن دسترسی ها دقت فرمایید
        </p>
        <p className='text-md mb-1 text-gray-500'>
          در نهایت کلید ثبت را فراموش نکنید
        </p>
        <div className='grid grid-cols-2 gap-4 w-1/2 max-lg:w-full'>
          <Access selected={selected} setSelected={setSelected} people={userlist} />
          <Role selectedRole={selectedRole} setSelectedRole={setSelectedRole} roles={roles} />
        </div>
      </div>
    </div>
  )
}

export default AccessUser