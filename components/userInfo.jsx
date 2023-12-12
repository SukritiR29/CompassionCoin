"use client"

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
const UserInfo = () => {
  return (
    <div>
        <h1>User Info</h1>
        <Link href={'/login'}>
        <button onClick={() => signOut()}>Log Out</button>
        </Link>
    </div>
  )
}

export default UserInfo