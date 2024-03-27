"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RxAvatar } from "react-icons/rx";



const Nav = () => {
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.user.name);
        }
      }, [session, status]);
  return (
    < div className='w-full pt-2 border border-slate-400 bg-gray-950 border-opacity-20 flex pt-4 pb-4 flex justify-between'>
        <h1 className=' pl-6 text-sm font-bold bg-gradient-to-r  from-pink-500  to-yellow-500  text-transparent bg-clip-text uppercase'>Compassion Coin</h1>
      <div className='flex'>
      <RxAvatar className='text-md text-slate-200 mr-2'/>
      <h1 className='mr-10 text-sm font-semibold text-slate-200 uppercase'>{userName}</h1>
      </div>
        
    </div>
  )
}

export default Nav