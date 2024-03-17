import React from 'react'
import LoginForm from '@/components/loginForm';


const page = () => {


  const backgroundImageUrl = 'url("/office.jpeg")';

  const containerStyle = {
    backgroundImage: 'url("/office.png")',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
  };
  return (
    <div className='w-screen h-screen bg-slate-900'>
      <div className='flex'>
      <div className='container h-screen w-1/2 bg-slate-800' style={{backgroundImage: 'url("/office2.jpeg")', backgroundSize: '100% 100%', backgroundPosition: 'center', opacity: 0.8 }}></div>
      <div className='p-16 ml-16 mt-10'>
        <LoginForm className='flex justify-center'/>
      </div>
      </div>
    </div>
  )
}

export default page