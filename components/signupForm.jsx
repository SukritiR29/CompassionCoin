"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoWarningOutline } from "react-icons/io5";


const SignupForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [error, setError] = useState("")

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!name || !email || !password || !role){
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
                role,
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
    <div className=' pr-2 pl-2 justify-end rounded-xl bg-slate-900 bg-opacity-70 border border-slate-800'>
            <div className='text-slate-300 p-2 pt-4'>
        <h1 className='text-slate-300 text-lg  text-center font-sans pt-4 '>COMPASSION COIN</h1>
            {/* <p className='text-xs text-center '>AI art by the people, for the people.</p> */}
        </div>
        <div className='pl-3 pr-3 text-slate-300'>
            <h2 className='text-md mb-1 text-center'>Sign Up</h2>
            <div className='w-max ml-5 mr-5'>
            <form onSubmit={handleSubmit}>
            
            
            <p className='text-xs'>Name:</p>
            <input onChange={(e) => setName(e.target.value)}
             type="text" 
             placeholder='Enter Name'
             className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-2 pr-20 text-xs w-max' />

            <p className='text-xs'>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} 
            type="email" name="name" 
            placeholder='Enter Email'
            className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-2 pr-20 text-xs ' />
            <p className='text-sm'>Password:</p>
            <input onChange={(e) => setPassword(e.target.value)} 
            type="password" name="name" 
            placeholder='Enter Password'
            className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-2 pr-20 text-xs ' />
            <p className='text-sm'>Join as:</p>
            <div className='flex gap-5'>
            <div>
                <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="Admin"
                    onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="admin" className='text-xs'>Admin</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="user"
                    name="role"
                    value="User"
                    onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="user" className='text-xs'>User</label>
            </div>

            </div>

            <div className='text-center items-center justify-center mt-4'>
            <button className='bg-pink-600 p-1 pr-4 pl-4 text-slate-300 rounded-lg text-xs'>Sign up</button>
            {error && (
            <div className='bg-red-600 p-1 text-xs flex justify-center rounded-md mt-3'>
            <IoWarningOutline className='text-xs mr-2 ' />
            {error}
            </div>
        )}
        </div>
         
            </form>
            </div>
        </div>

        <div className='text-xs text-slate-300 mt-4 mb-6 text-center'>
            <h3>Already have an account? <Link href="/login" className='text-blue-400'>Login</Link> </h3>

        </div>
    </div>


  )
}

export default SignupForm