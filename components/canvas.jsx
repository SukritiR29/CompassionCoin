import React from 'react'
import { useState } from 'react';
import DraggableButton from './DraggableButton'


const Canvas = () => {

    const [components, setComponents] = useState([]);

    const handleDrop = (event) => {
      const componentType = event.dataTransfer.getData('componentType');
  
      // Add the dropped component to the canvas
      setComponents((prevComponents) => [
        ...prevComponents,
        { type: componentType, id: Date.now(), position: { x: event.clientX, y: event.clientY } },
      ]);
    };


  return (
    <div>
         <div
      className="relative h-screen w-1/2 bg-gray-300"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Render components on the canvas */}
      {components.map((component) => (
        <DraggableButton key={component.id} position={component.position} />
      ))}
    </div>
    </div>
  )
}

export default Canvas