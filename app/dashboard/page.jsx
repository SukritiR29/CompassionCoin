"use client"
import React, { useState } from 'react'
import { useSession  } from 'next-auth/react'
import UserInfo from '@/components/userInfo'
import Canvas from '../../components/canvas'


const page = () => {

  const [components, setComponents] = useState([]);

  const handleDrop = (event) => {
    const componentType = event.dataTransfer.getData('componentType');

    // Add the dropped component to the canvas
    setComponents((prevComponents) => [
      ...prevComponents,
      { type: componentType, id: Date.now(), position: { x: event.clientX, y: event.clientY } },
    ]);
  };
  const { data:session } = useSession();

  return (
    <div>
      <div className='flex justify-between p-3 bg-pink-600'>
        <h1 className='font-extrabold text-slate-50 text-lg'>EASELS AI</h1>
        <div className="flex-none text-slate-50">
        <details >
          <summary>
          {session?.user?.name}
          </summary>
          <ul className="p-2 text-md bg-base-100 bg-pink-900 border rounded-lg border-slate-50">
           <li><UserInfo/></li>
          </ul>
        </details>
        </div>
      </div>
      <div>
      <Canvas/>
    </div>
    </div>
  )
}

export default page