/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'
import Link from 'next/link';
import { RxAvatar } from "react-icons/rx";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';


const About = () => {

    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.user.name);
        }
      }, [session, status]);

  return (
    <div className='bg-white h-max flex flex-wrap'>
         < div className=' w-full pt-2  text-gray-600  bg-gray-100 shadow flex pt-3 pb-3 flex justify-between'>
        <h1 className='  pl-6 text-sm font-bold  uppercase '>Compassion Coin</h1>
      <div className='flex'>
    
      <RxAvatar className='text-md text-gray-600 mr-2'/>
      <h1 className='mr-10 text-sm font-semibold text-gray-600 uppercase'>{userName}</h1>
      </div>
    </div>

      <div className='p-4 felx w-screen '>
        <h1 className='text-3xl font-bold text-gray-600 w-full flex justify-center '>What is Compassion Coin?</h1>
        <div className='flex justify-center items-center gap-20 mt-10'>
        <p className='w-1/2 text-justify text-sm'>Compassion Coin is a platform that helps organizations streamline their processes for managing freelance programs, scholarships, fellowships, and other similar programs.
        It allows organizations to publish their offers and for applicants to apply to the offer best suited for them based on their skills, experiences and interests.
        The platform allows mission-driven organizations - from foundations, corporate, and research organizations to universities, government agencies, and associations - exist to discover some of the most worthy 
        aspirants and deliver them with most invaluable resources and knowladge. Your work is nothing short of inventions, and deserves to be supported by technology that improves your programs and expands your reach. <br />
        We believe that there is nothing standard about your mission. That is why we are proud to offer Compassion Coin, a technology solution that is flexible, data-driven, and designed to provide a better experience to all those who are central to your program efforts. <br />
        Compassion Coin makes it easier to engage applicants, gives better information and impact reporting to  decision makers, and minimizes tedious and less productive activities for reviewers and program administrators. 
        </p>
        
        <img src='/about.jpeg' alt='About' className='w-[30rem] rounded rounded-xl m-4' />

        </div>

        <div className='mt-16 p-10 bg-light-blue'>
        <h1 className='text-3xl font-bold text-gray-600 w-full flex justify-center '>Who do we serve?</h1>
  
        <p className=' text-justify text-sm mt-6 flex justify-center'> Compassion Coin servers verious fields, all with smooth user experience</p>
        <div className='flex justify-center'>
        <ol className='m-6 mt-2 flex flex-wrap w-1/3 justify-between gap-5'>
          <li className='bg-pastel-purple rounded p-1 px-3 text-xs rounded-xl'>Corporate Foundations</li>
          <li className='bg-pastel-green text-white rounded p-1 px-3 text-xs rounded-xl'>Government</li>
          <li className='bg-pastel-purple rounded p-1 px-3 text-xs rounded-xl'>Banks</li>
          <li className='bg-pastel-green text-white rounded p-1 px-3 text-xs rounded-xl'>Higher Educations</li>
          
          <li className='bg-pastel-purple rounded p-1 px-3 text-xs rounded-xl'>Startups</li>
          <li className='bg-pastel-green text-white rounded p-1 px-3 text-xs rounded-xl'>Wealth Managers</li>
        </ol>
        </div>
       
        </div>
        </div>
        <div className='mt-10 bg-gray-200 w-screen'>
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

export default About