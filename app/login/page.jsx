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
    <div className='w-screen h-screen' style={{backgroundImage: 'url("/cc-b.jpg")', backgroundSize: 'cover'}}>
      <div className='flex'>
      <div className='container h-screen w-1/2' ></div>
      <div className='p-16 ml-6 mt-10'>
        <LoginForm className='flex justify-center'/>
      </div>
      </div>
    </div>
  )
}

export default page