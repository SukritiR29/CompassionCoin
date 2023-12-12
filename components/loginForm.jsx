"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    <div className=''>
        <div>
            <h1>Easels AI</h1>
            <p>AI art by the people, for the people.</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div>
            <h2>Log In</h2>
            <div>
            <p>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="name" placeholder='Enter Email' />
            <p>Password:</p>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="name" placeholder='Enter Password' />
            </div>
        </div>
        <div>
            <button className='bg-white text-black'>Sign up</button>
        </div>
        {error && (
        <div>
        <h1 className='bg-red-500 w-fit mt-10'>{error}</h1>
    </div>
        )}


      </form>
        <div>
            <h3>Do not have an account? </h3>
        <Link href={'/'}>
            Register
        </Link>
        </div>
    </div>
  )
}

export default LoginForm