"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignupForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!name || !email || !password){
            setError("All fields are nexessary.");
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
    <div className='text-center'>
        <div>
            <h1>Easels AI</h1>
            <p>AI art by the people, for the people.</p>
        </div>
        <div>
            <h2>Sign Up</h2>
            <div>
            <form onSubmit={handleSubmit}>
            <p>Name:</p>
            <input onChange={(e) => setName(e.target.value)}
             type="text" 
             placeholder='Enter Name' />

            <p>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="name" placeholder='Enter Email' />
            <p>Password:</p>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="name" placeholder='Enter Password' />

            <div>
            <button className='bg-white text-black mt-10'>Sign up</button>
            {error && (
            <div>
            {error}
            </div>
        )}
        </div>
         
            </form>
            </div>
        </div>

        <div>
            <h3>Already have an account?</h3>
            <Link href="/login">Login</Link>

        </div>
    </div>


  )
}

export default SignupForm