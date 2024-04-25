/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'
import Link from 'next/link';
import { RxAvatar } from "react-icons/rx";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';


const Role = () => {

    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.user.name);
        }
      }, [session, status]);

  return (
<div className='h-screen flex flex-wrap' style={{backgroundImage: 'linear-gradient(to right, #B0E0E6 50%, #fff 50%)'}}>

< div className=' w-full pt-2  text-gray-600  bg-gray-100 shadow flex pt-3 pb-3 flex justify-between'>
        <h1 className='  pl-6 text-sm font-bold  uppercase '>Compassion Coin</h1>
      <div className='flex'>
    
      <RxAvatar className='text-md text-gray-600 mr-2'/>
      <h1 className='mr-10 text-sm font-semibold text-gray-600 uppercase'>{userName}</h1>
      </div>
    </div>

    <div className='p-4 w-screen '>
        <h1 className='text-2xl font-bold text-gray-600 w-full flex justify-center mb-10  mt-10  '>Roles and Access Control</h1>
      <div className='flex justify-between'>
        <div className='bg-white mt-6 m-20 ml-[10rem] p-4 w-1/4 rounded rounded-xl shadow'>
        <h1 className=' px-20 text-sm text-gray-600 font-bold flex justify-center uppercase '>Admin</h1>
        <p className='mt-4 justify-center text-justify text-xs'>Admins are the organizations, firms, corporates etc. providing the programs. <br /> The admin has full administrative control over the Compassion Coin account associated with their organization. 
        <br /> Admins  can make high-level decisions regarding the structure, functionality, and usage of Zengine within their organization.</p>
        <ul className='text-xs mt-6 list-disc'>
          <li className='m-2'>Create Programs</li>
          <li className='m-2'>View all programs</li>
          <li className='m-2'>View applications</li>
          <li className='m-2'>Revert to applications</li>
        </ul>
        </div>
        <div className='flex justify-center items-center'>VS</div>
        <div className='bg-pastel-blue mt-6 m-20 mr-[10rem] p-4 w-1/4 rounded rounded-xl shadow'>
        <h1 className=' px-20 text-sm text-gray-600 font-bold flex justify-center uppercase '>Applicants</h1>
        <p className='mt-4 justify-center text-justify text-xs'>Applicants are the users in search for the programs. <br /> The Applicants are individuals who interact with Compassion Coin by submitting forms, applications, or requests for consideration by an organization. 
        <br /> Their privileges are typically limited to the specific actions allowed within the application or submission process.</p>
        <ul className='text-xs mt-6 list-disc'>
          <li className='m-2'>Browse through Programs</li>
          <li className='m-2'>Apply to programs</li>
          <li className='m-2'>View their applications</li>
        </ul>
        </div>
      </div>
    </div>

    <div className=' bg-gray-200 w-screen m-0'>
        <footer className="footer footer-center p-4 bg-base-300 text-gray-800 text-xs flex justify-between">
  <aside className='flex justify-between gap-[21rem]'>
    <p>Copyright © 2024 - All right reserved by Brainy Desk LLP</p>
    <br />
    <p className='flex justify-end'>Coded and designed by Sukriti Rajora </p>
  </aside>
</footer>
        </div>
        

  
        
    </div>
  )
}

export default Role