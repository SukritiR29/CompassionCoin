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
    < div className='fixed w-full pt-2  text-gray-600  bg-gray-100 shadow flex pt-3 pb-3 flex justify-between'>
        <h1 className=' pl-6 text-sm font-bold  uppercase '>Compassion Coin</h1>
      <div className='flex'>
      <RxAvatar className='text-md text-gray-600 mr-2'/>
      <h1 className='mr-10 text-sm font-semibold text-gray-600 uppercase'>{userName}</h1>
      </div>
        
    </div>
  )
}

export default Nav

//bg-gradient-to-r  from-pink-500  to-yellow-600  text-transparent bg-clip-text