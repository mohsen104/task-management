import Signin from '@/components/modules/Signin'
import Signup from '@/components/modules/Signup'
import React, { useState } from 'react'

function index() {
    const [sign, setSign] = useState(false);
    return (
        <div className='bg-[#d3d5ff] grid place-items-center w-full h-screen col-span-full row-span-full'>
            <div className='grid grid-cols-2 bg-white place-items-center rounded-xl shadow-lg max-lg:flex max-lg:justify-center'>

                <div className='bg-[#575DE8] relative rounded-r-xl h-full max-lg:hidden'>
                    <img src="header.jpg" alt="" className='brightness-50 w-[389px] h-full object-cover rounded-r-xl' />
                    <div className="filterHeader rounded-r-xl"></div>
                </div>

                <div className='grid place-items-center w-[389px] h-[489px] p-10'>
                    {
                        sign ?
                            <Signup setSign={setSign} />
                            :
                            <Signin setSign={setSign} />
                    }
                </div>

            </div>
        </div>
    )
}

export function getServerSideProps(context) {
    const { token } = context.req.cookies;
    if (token) {
        return {
            redirect: { destination: "/" }
        };
    }
    return {
        props: { user: "title" }
    }
}

export default index