"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import About from '@/app/about/page';
import { div } from '@tensorflow/tfjs';



const UserSide = () => {

    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.user.name);
        }
      }, [session, status]);

      const firstLetter = userName ? userName.charAt(0) : '';

  
  return (
  
    <div className='fixed inset-y-0 h-screen mt-14 border border-opacity-20 border-slate-200 rounded flex flex-col w-56 p-2 bg-gray-950'>
    <div className='text-slate-200 flex-row  text-sm justify-center items-center text-center p-2 mb-5'>
        <div className='h-10 w-10 ml-20 m-2 rounded-full bg-purple-600 text-slate-200 flex items-center justify-center bg-gray-300 text-gray-600 uppercase'>
            {firstLetter}
        </div>
        <p className='text-bold text-lg mr-6 uppercase'>{userName}</p>
    </div>
    <div className='flex flex-col gap-4  text-slate-200'>
        <Link href={'/about'}>
            <button className='w-full border border-opacity-20 hover:bg-slate-500 border-slate-200 text-start text-xs p-2 text-slate-100 rounded'>ABOUT</button>
        </Link>
        <Link href={'/roles'}>  
              <button className='w-full border border-opacity-20 hover:bg-slate-500 border-slate-200 text-start text-xs p-2 text-slate-100 rounded'>ROLES</button>
        </Link>
        <Link href={'/why_us'}>
        <button className='w-full border border-opacity-20 hover:bg-slate-500 border-slate-200 text-start text-xs p-2 text-slate-100 rounded'>WHY US</button>
        </Link>
       
    </div>
    <div className='fixed bottom-4 p-4'>
        <button className='w- text-start text-xs p-2 pl-16 pr-16 text-red-500 border border-red-500 rounded hover:bg-red-700 hover:text-slate-200'>Log Out</button>
    </div>
</div>

  )
}

export default UserSide