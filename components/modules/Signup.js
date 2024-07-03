import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import Swal from 'sweetalert2';

function Signup({ setSign }) {

  const router = useRouter();

  async function signupFetch(values) {
    const res = await fetch("https://task-management-nine-mu.vercel.app/api/auth/signup/", {
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
        title: "نام کاربری یا ایمیل وارد شده وجود دارد !",
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
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-semibold'>خوش آمدید !</h1>
      <Formik
        validate={(values) => {
          const errors = {};

          if (values.firstname.trim() == "") {
            errors.firstname = "وارد کردن نام ضروری می باشد"
          } else if (values.lastname.trim() == "") {
            errors.lastname = "وارد کردن نام خانوادگی ضروری می باشد"
          } else if (values.username.trim() == "") {
            errors.username = "وارد کردن نام کاربری ضروری می باشد"
          } else if (values.username.trim().length < 3) {
            errors.username = "نام کاربری باید حداقل 3 حرف باشد"
          } else if (values.email.trim() == "") {
            errors.email = "لطفا ایمیل خود را وارد نمایید"
          } else if (!(values.email.trim().match("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"))) {
            errors.email = "لطفا ایمیل خود را صحیح وارد نمایید"
          } else if (values.password.trim() == "") {
            errors.password = "لطفا رمز عبور را وارد نمایید"
          } else if (values.password.trim().length < 6) {
            errors.password = "رمز عبور باید حداقل 6 کاراکتر داشته باشد"
          } else if (values.email.trim() === values.username.trim()) {
            errors.username = "نام کاربری نمیتواند ایمیل باشد"
          }

          return errors;
        }}
        initialValues={{ firstname: "", lastname: "", username: "", email: "", password: "" }}
        onSubmit={(values) => {
          signupFetch(values);
        }}
      >
        <Form className='flex flex-col items-start w-full'>
          <div className='grid grid-cols-2 gap-2 w-full'>
            <div className='flex flex-col items-start'>
              <Field name='firstname' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='نام' />
              <ErrorMessage name="firstname">{(msg) => <span className='text-red-500 text-[12px]'>{msg}</span>}</ErrorMessage>
            </div>
            <div className='flex flex-col items-start'>
              <Field name='lastname' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='نام خانوادگی' />
              <ErrorMessage name="lastname">{(msg) => <span className='text-red-500 text-[12px]'>{msg}</span>}</ErrorMessage>
            </div>
          </div>

          <Field name='username' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='نام کاربری' />
          <ErrorMessage name="username">{(msg) => <span className='text-red-500 text-sm'>{msg}</span>}</ErrorMessage>

          <Field name='email' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="text" placeholder='ایمیل' />
          <ErrorMessage name="email">{(msg) => <span className='text-red-500 text-sm'>{msg}</span>}</ErrorMessage>

          <Field name='password' className='mt-3.5 mb-1 w-full rounded-md p-1.5 border-2 focus:outline-none focus:border-2 focus:border-[#009BF8]' type="password" placeholder='رمز عبور' id="passwordInput" />
          <ErrorMessage name="password">{(msg) => <span className='text-red-500 text-sm'>{msg}</span>}</ErrorMessage>

          <button type='submit' className='shadow-lg shadow-[#D3D5FF] mt-3 w-fit mx-auto px-8 text-center bg-[#444AD0] text-white rounded-md py-1.5 uppercase'>ثبت نام</button>

          <div className='flex flex-row items-center justify-center gap-1 w-full mt-4'>
            <p>برای ورود به حساب کاربری خود <span onClick={() => setSign(false)} className='text-[#575DE8] cursor-pointer'>کلیک</span> کنید</p>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Signup