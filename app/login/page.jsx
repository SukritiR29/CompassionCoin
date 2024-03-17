import React from 'react'
import LoginForm from '@/components/loginForm';
const page = () => {
<<<<<<< HEAD

  const backgroundImageUrl = 'url("/office.jpeg")';
=======
>>>>>>> 2db4622c6b3ff770f8ab60bbadd494adcc892b58

  const containerStyle = {
    backgroundImage: 'url("/office.png")',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
  };
  return (
<<<<<<< HEAD
<div className="hero min-h-screen flex items-center justify-end bg-black" style={{backgroundImage: backgroundImageUrl, backgroundSize: 'cover'}}>
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <div className="max-w-md">
    <div className='max-h-screen'>
      <div className='flex justify-end p-20 mr-[100px]'>
      <LoginForm/>
      </div>
    </div>
    </div>
  </div>
</div>

 
=======
    <div className='w-screen h-screen bg-slate-900'>
      <div className='flex'>
      <div className='container h-screen w-1/2 bg-slate-800' style={{backgroundImage: 'url("/office2.jpeg")', backgroundSize: '100% 100%', backgroundPosition: 'center', opacity: 0.8 }}></div>
      <div className='p-20 ml-16 mt-6'>
        <LoginForm className='flex justify-center'/>
      </div>
      </div>
    </div>
>>>>>>> 2db4622c6b3ff770f8ab60bbadd494adcc892b58
  )
}

export default page