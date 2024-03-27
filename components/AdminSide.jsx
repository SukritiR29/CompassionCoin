"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

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
    <div className='border border-opacity-20 border-slate-200 rounded flex-row w-1/6 p-2 h-max  '>
        <div className='text-slate-200 flex-row  text-sm justify-center items-center text-center p-2 mb-5'>
        <div className='h-10 w-10 ml-14 m-2 rounded-full bg-purple-600 text-slate-200 flex items-center justify-center bg-gray-300 text-gray-600 uppercase'>
                {firstLetter}
            </div>
        <p className='text-bold text-lg uppercase'>{userName}</p>
        </div>
      <div className='flex flex-col gap-4  text-slate-200'>
        <button className='w-full border  border-opacity-20 border-slate-200 text-start text-xs p-2  text-slate-100 rounded'>ABOUT</button>
        <button className='w-full border border-opacity-20 border-slate-200 text-start text-xs p-2 text-slate-100 rounded'>ROLES</button>
        <button className='w-full border border-opacity-20 border-slate-200 text-start text-xs p-2 text-slate-100 rounded'>WHY US</button>
        <button className='w-full border border-opacity-20 border-slate-200 text-start text-xs p-2 text-slate-100 rounded'> PROFILE</button>
      </div>
      <div className='justify-bottom mt-20'>
      <button className='w-full text-start text-xs p-2 text-red-500 border border-red-500 rounded'>Log Out</button>
      </div>
    </div>
  )
}

export default AdminSide