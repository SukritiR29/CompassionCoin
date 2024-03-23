"use client"

import React from 'react'
import OfferList from '../../components/userOffer'
import UserApplication from '@/components/userApplication'


const page = () => {
  return (
    <div className='bg-slate-900 h-max flex'>
      <div>
        <OfferList/>
      </div>
      <div>
        <UserApplication/>
      </div>
    </div>
  )
}

export default page