"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";






const AdminSide = () => {

    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.user.name);
        }
      }, [session, status]);

      const firstLetter = userName ? userName.charAt(0) : '';

  
  return (
    <div className='fixed inset-y-0 h-screen mt-12 shadow rounded flex flex-col w-56 p-2 bg-gray-50'>
    <div className='text-slate-800 flex-row  text-sm justify-center items-center text-center p-2 mb-5'>
        <div className='h-10 w-10 ml-16 m-2 rounded-full text-slate-200 flex items-center justify-center bg-pastel-blue text-slate-950 uppercase'>
            {firstLetter}
        </div>
        <p className='font-bold text-gray-600 text-lg mr-6 uppercase '>{userName}</p>
    </div>
    <div className='flex flex-col gap-4  text-slate-800'>
    <button className='w-full bg-gray-200 flex gap-2 shadow border-slate-200 text-start text-xs p-2 text-slate-800 rounded'>
    <FaHome className='text-lg'/>
        HOME
    </button>
        <Link href={'/about'}>
            <button className='w-full border flex gap-2 border-blue-950 shadow hover:bg-gray-200 border-slate-200 text-start text-xs p-2 text-slate-800 rounded'> <FaInfoCircle className='text-lg' />
ABOUT</button>
        </Link>
        <Link href={'/roles'}>  
              <button className='w-full border flex gap-2 shadow border-blue-950 hover:bg-gray-200 border-slate-200 text-start text-xs p-2 text-slate-800 rounded'>
              <FaUsers className='text-lg'/>
                ROLES</button>
        </Link>
        <Link href={'/why_us'}>
        <button className='w-full border flex gap-2 shadow border-blue-950 hover:bg-gray-200 border-slate-200 text-start text-xs p-2 text-slate-800 rounded'><FaAward className='text-lg'/>
WHY US</button>
        </Link>
       
    </div>
    <div className='fixed bottom-4 p-4'>
        <Link href={'/login'}>
        <button className='w- text-start flex gap-2 text-xs p-2 pl-14 pr-14 text-red-500 border border-red-500 rounded hover:bg-red-700 hover:text-slate-200'><IoLogOut className='text-lg'/>Log Out</button>
        </Link>
    </div>
</div>
  )
}

export default AdminSide