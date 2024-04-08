"use client"

import React from 'react'
import OfferList from '../../components/userOffer'
import UserApplication from '@/components/userApplication'
import Nav from '@/components/nav'
import UserSide from '@/components/UserSide'

const page = () => {
  return (
    <div className='bg-gray-200  h-max overflow-hidden'>
      <Nav/>
      <div className='flex w-screen'>     
        <UserSide className=''/>     
        <OfferList/>
        <UserApplication className=''/>
      
      </div>
     
    </div>
  )
}

export default page