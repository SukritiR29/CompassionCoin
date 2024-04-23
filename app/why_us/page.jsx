
"use client"
import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const WhyUs = () => {

  const { data: session, status } = useSession();
  const [userName, setUserName] = useState('');

  useEffect(() => {
      if (status === 'authenticated') {
        setUserName(session.user.name);
      }
    }, [session, status]);


  return (
    <div className='bg-gray-200 h-screen flex flex-wrap'>
        < div className=' w-full pt-4 h-14  text-yellow-500  bg-blue-950 shadow flex pt-3 pb-3 flex justify-between'>
        <h1 className=' pl-6 text-sm font-bold  uppercase '>Compassion Coin</h1>
      <div className='flex'>
      <RxAvatar className='text-md text-stone-200 mr-2'/>
      <h1 className='mr-10 text-sm font-semibold text-stone-200 uppercase'>{userName}</h1>
      </div> 
      </div>

      <div className='p-4 felx w-1/2 ml-[20rem] justify-center '>
        <h1 className='text-3xl font-bold text-gray-600 w-full flex justify-center '>Why Us?</h1>
        <p className='text-justify m-2 '>Compassion Coin offers several compelling reasons for organizations to choose it as their platform for managing workflows, data, and processes:</p>
        <p className='text-justify m-2'>Ease of Use: The platform features a user-friendly interface and intuitive tools that make it easy for users to design forms, set up workflows, and manage data without extensive technical expertise.</p>
        <p className='text-justify m-2'>Collaboration Tools: Compassion Coin fosters collaboration among team members, stakeholders, and external partners through built-in communication and collaboration tools. Real-time notifications and alerts keep users informed and engaged.</p>
        <p  className='text-justify m-2'>Scalability and Security: Compassion Coin is designed to scale with the needs of organizations, from small teams to large enterprises. Advanced security features, including role-based access control and encryption, help safeguard sensitive information.</p>
        </div>
    </div>
  )
}

export default WhyUs