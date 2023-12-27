"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoWarningOutline } from "react-icons/io5";


const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const res =  await signIn("credentials", {
                email,
                 password,
                 redirect:false,
            })

            if(res.error) {
                setError("Invalid Credentials");
                return;
            }

        router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='p-5 pr-10 pl-10 justify-end rounded-xl bg-slate-900 bg-opacity-50'>
        <div className='text-slate-300'>
            <h1 className='text-slate-300 text-4xl text-center font-sans mb-2'>Easels AI</h1>
            <p className='text-xs text-center '>AI art by the people, for the people.</p>
        </div>
        <div  className='p-3 text-slate-300'>
        <h2 className='text-lg text-center'>Log In</h2>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='pr-3 pl-3 pb-4 text-slate-300'>
            <div>
            <p className='text-sm'>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} 
            type="email" name="name" 
            placeholder='Enter Email'
            className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-1 pl-3 text-sm ' />
            <p className='text-sm mt-3'>Password:</p>
            <input onChange={(e) => setPassword(e.target.value)} 
            type="password" name="name" 
            placeholder='Enter Password'
            className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-1 pl-3 text-sm ' />
            </div>
        </div>
        <div className='text-center flex items-center justify-center mt-1 mb-3'>
            <button className='bg-pink-600 p-1 pr-4 pl-4 text-slate-300 rounded-lg text-sm'>Login</button>
        </div>
        <div className='flex justify-center'>
        {error && (
        <div className='bg-red-500 p-1 text-sm flex justify-center rounded-md text-slate-100 w-3/4 flex justify-center'>
        <IoWarningOutline className='text-lg mr-2'/>
        {error}
    </div>
        )}    
        </div>

      </form>
        <div className='text-sm text-slate-300 mt-10 text-center'>
            <h3 className=''>Do not have an account? <Link href={'/'} className='text-blue-500'> Register </Link> </h3>
        </div>
    </div>
  )
}

export default LoginForm