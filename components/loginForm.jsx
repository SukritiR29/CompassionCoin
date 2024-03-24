"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

   const router = useRouter();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const result = await signIn('credentials', {
            email,
            password,
            role,
            redirect: false,
        });

        if (!result.error) {
            // Redirect based on user's role
            if (role === 'Admin') {
                router.push('/AdminPortal'); // Redirect admin to admin portal
            } else {
                router.push('/UserPortal'); // Redirect user to user portal
            }
        } else {
            // Handle login error
            console.error('Login error:', result.error);
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};

    return (
        <div className=' pr-2 pl-2 justify-end rounded-xl bg-slate-900 bg-opacity-70 pt-5 border border-slate-800'>
            <div className='text-slate-300 p-1 pt-4'>
                <h1 className='text-slate-300 text-2xl  text-center font-sans mb-2 '>COMPASSION COIN</h1>
                {/* <p className='text-xs text-center '>AI art by the people, for the people.</p> */}
            </div>
            <div className='p-3 text-slate-300'>
                <h2 className='text-lg mb-1 text-center'>Login</h2>
                <div className='w-max ml-5 mr-5'>
                    <form onSubmit={handleSubmit}>
                        <p className='text-sm'>Email:</p>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="name" placeholder='Enter Email' className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-2 pr-20 text-sm' />
                        <p className='text-sm'>Password:</p>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="name" placeholder='Enter Password' className='bg-transparent border border-slate-400 rounded-lg mt-1 mb-3 p-2 pr-20 text-sm' />
                        <p className='text-sm mt-2'>Join as:</p>
                        <div className='flex gap-5 mt-2'>
                            <div>
                                <input type="radio" id="admin" name="role" value="Admin" onChange={(e) => setRole(e.target.value)} />
                                <label htmlFor="admin" className='text-sm'>Admin</label>
                            </div>
                            <div>
                                <input type="radio" id="user" name="role" value="User" onChange={(e) => setRole(e.target.value)} />
                                <label htmlFor="user" className='text-sm'>User</label>
                            </div>
                        </div>

                        <div className='text-center items-center justify-center mt-4'>
                            <button className='bg-pink-600 p-1 pr-4 pl-4 text-slate-300 rounded-lg text-sm'>Login</button>
                            
                        </div>
                    </form>
                    <div className='text-sm text-slate-300 mt-4 mb-4 text-center'>
                        <h3 className=''>Do not have an account? <Link href={'/'} className='text-blue-400'> Register </Link> </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
