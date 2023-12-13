"use client"
import React from 'react'
import { useSession  } from 'next-auth/react'
import UserInfo from '@/components/userInfo'


const page = () => {

  const { data:session } = useSession();
  return (
    <div>
      <div>
        <p>{session?.user?.name}</p>
        <p>{session?.user?.email}</p>
      </div>
        <UserInfo/>
    </div>
  )
}

export default page