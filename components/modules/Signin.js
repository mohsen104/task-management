import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Signin({ setSign }) {
  const router = useRouter();

  async function signinFetch(values) {
    const res = await fetch("http://localhost:3000/api/auth/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    if (res.status === 200) {
      router.push("/");
    } else if (res.status === 422) {
      Swal.fire({
        icon: "error",
        title: "نام کاربری یا رمز عبور اشتباه می باشد !",
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
    <div className='flex flex-col items-center w-full'>
      <h1 className='text-2xl font-semibold'>حساب کاربری</h1>
      <Formik
        validate={(values) => {
          const errors = {};

          if (values.identifier.trim() == "") {
            errors.identifier = "وارد کردن ایمیل یا نام کاربری ضروری می باشد"
          } else if (values.identifier.trim().length < 3) {
            errors.identifier = "نام کاربری باید حداقل 3 حرف باشد"
          } else if (values.password.trim() == "") {
            errors.password = "لطفا رمز عبور را وارد نمایید"
          } else if (values.password.trim().length < 6) {
            errors.password = "رمز عبور باید حداقل 6 کاراکتر داشته باشد"
          }

          return errors;
        }}
        initialValues={{ identifier: "", password: "" }}
        onSubmit={(values) => {
          signinFetch(values);
        }}
      >
        <Form className='flex flex-col items-start w-full'>
          <Field name='identifier' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='ایمیل یا نام کاربری' />
          <ErrorMessage name="identifier">{(msg) => <span className='text-red-500 text-sm'>{msg}</span>}</ErrorMessage>
          <Field name='password' className='relative mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="password" placeholder='رمز عبور' id="passwordInput" />
          <ErrorMessage name="password">{(msg) => <span className='text-red-500 text-sm'>{msg}</span>}</ErrorMessage>
          <button type='submit' className='shadow-lg shadow-[#D3D5FF] mt-3 w-fit mx-auto px-8 text-center bg-[#444AD0] text-white rounded-md py-1.5 uppercase'>ورود</button>
          <div className='flex flex-row items-center justify-center gap-1 w-full mt-4'>
            <p>حساب کاربری ندارید ؟</p>
            <p onClick={() => setSign(true)} className='text-[#575DE8] cursor-pointer'>ثبت نام</p>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Signin