"use client"

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
const UserInfo = () => {
  return (
    <div className='text-sm'>
        <Link href={'/login'}>
        <button onClick={() => signOut()}>Log Out</button>
        </Link>
    </div>
  )
}

export default UserInfo