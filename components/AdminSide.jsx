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


  
  return (
    <div className='border border-opacity-20 border-slate-200 rounded  w-1/6 p-2 m-4 ficed  '>
        <div className='text-slate-200 text-sm border p-2 border-slate-200 border-opacity-20 rounded mb-5'>
        <p className='ml-2'>{userName}</p>
        </div>
      <div className='flex flex-col gap-4 text-slate-200'>
        <button className='w-full bg-slate-700 text-start text-sm p-2 text-slate-100 rounded'>Offers</button>
        <button className='w-full bg-slate-700 text-start text-sm p-2 text-slate-100 rounded'>Offers</button>
        <button className='w-full bg-slate-700 text-start text-sm p-2 text-slate-100 rounded'>Offers</button>
        <button className='w-full bg-slate-700 text-start text-sm p-2 text-slate-100 rounded'>Offers</button>
        <button className='w-full bg-slate-700 text-start text-sm p-2 text-slate-100 rounded'>Offers</button>
      </div>
      <div className='justify-bottom mt-20'>
      <button className='w-full text-start text-sm p-2 text-red-500 border border-red-500 rounded'>Log Out</button>
      </div>
    </div>
  )
}

export default AdminSide