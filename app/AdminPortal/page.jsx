import React from 'react'
import AdminSide from '@/components/AdminSide'
import AdminOffer from '@/components/AdminOffer'

const page = () => {
  return (
    <div className='bg-slate-900 h-screen '>
      <div className='flex'>
      <AdminSide className='m-4'/>
      <AdminOffer/>
      </div>   
    </div>
  )
}

export default page