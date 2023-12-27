"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoWarningOutline } from "react-icons/io5";


const SignupForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!name || !email || !password){
            setError("All fields are necessary!");
            console.log("Error.")
            return;
        }

        try {

            const resUserExists = await fetch("api/userExisits", {
                method: "POST", 
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            })

            const { user } = await resUserExists.json();
                
            if(user) {
                setError("User already exists.");
                return;
            }


           const res = await fetch('api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
           });
           if(res.ok) {
            const form = e.target;
            form.reset();
            router.push("/login")
           } else {
            console.log("Registration failed.");
           }
        } catch (error) {
            console.log("Error during registration", error);
        }
    }  
    

  return (
    <div className=' p-5 pr-10 pl-10 justify-end rounded-xl bg-slate-900 bg-opacity-50'>
        <div className='text-slate-300'>
            <h1 className='text-slate-300 text-4xl text-center font-sans mb-2'>Easels  AI</h1>
            <p className='text-xs text-center '>AI art by the people, for the people.</p>
        </div>
        <div className='p-3 text-slate-300'>
            <h2 className='text-lg mb-1 text-center'>Sign Up</h2>
            <div className='w-max ml-5 mr-5'>
            <form onSubmit={handleSubmit}>
            <p className='text-sm'>Name:</p>
            <input onChange={(e) => setName(e.target.value)}
             type="text" 
             placeholder='Enter Name'
             className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-1 pl-3 text-sm w-max' />

            <p className='text-sm'>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} 
            type="email" name="name" 
            placeholder='Enter Email'
            className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-1 pl-3 text-sm ' />
            <p className='text-sm'>Password:</p>
            <input onChange={(e) => setPassword(e.target.value)} 
            type="password" name="name" 
            placeholder='Enter Password'
            className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-1 pl-3 text-sm ' />

            <div className='text-center items-center justify-center mt-4 mb-3'>
            <button className='bg-pink-600 p-1 mb-2 pr-4 pl-4 text-slate-300 rounded-lg text-sm'>Sign up</button>
            {error && (
            <div className='bg-red-500 p-1 text-sm flex justify-center rounded-md'>
            <IoWarningOutline className='text-lg mr-2 ' />
            {error}
            </div>
        )}
        </div>
         
            </form>
            </div>
        </div>

        <div className='text-sm text-slate-300 mt-1 text-center'>
            <h3>Already have an account? <Link href="/login" className='text-blue-500'>Login</Link> </h3>

        </div>
    </div>


  )
}

export default SignupForm