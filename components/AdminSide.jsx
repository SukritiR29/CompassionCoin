"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';


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
    <div className='fixed inset-y-0 h-screen mt-14 border border-blue-950 border-opacity-30 shadow rounded flex flex-col w-56 p-2 bg-gray-100'>
    <div className='text-slate-800 flex-row  text-sm justify-center items-center text-center p-2 mb-5'>
        <div className='h-10 w-10 ml-16 m-2 rounded-full text-slate-200 flex items-center justify-center bg-blue-950 text-gray-600 uppercase'>
            {firstLetter}
        </div>
        <p className='font-bold text-gray-600 text-lg mr-6 uppercase '>{userName}</p>
    </div>
    <div className='flex flex-col gap-4  text-slate-800'>
    <button className='w-full bg-yellow-500  shadow border-slate-200 text-start text-xs p-2 text-slate-800 rounded'>HOME</button>
        <Link href={'/about'}>
            <button className='w-full border border-blue-950 shadow hover:bg-slate-500 border-slate-200 text-start text-xs p-2 text-slate-800 rounded'>ABOUT</button>
        </Link>
        <Link href={'/roles'}>  
              <button className='w-full border shadow border-blue-950 hover:bg-slate-500 border-slate-200 text-start text-xs p-2 text-slate-800 rounded'>ROLES</button>
        </Link>
        <Link href={'/why_us'}>
        <button className='w-full border shadow border-blue-950 hover:bg-slate-500 border-slate-200 text-start text-xs p-2 text-slate-800 rounded'>WHY US</button>
        </Link>
       
    </div>
    <div className='fixed bottom-4 p-4'>
        <Link href={'/login'}>
        <button className='w- text-start text-xs p-2 pl-16 pr-16 text-red-500 border border-red-500 rounded hover:bg-red-700 hover:text-slate-200'>Log Out</button>
        </Link>
    </div>
</div>
  )
}

export default AdminSide