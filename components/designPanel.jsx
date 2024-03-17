import React from 'react'
import DraggableButton from './DesignComponents/DraggableButton'


const DesignPanel = () => {

    const handleClick = (text, style) => {
        console.log('Button ${text} clicked with design ${style}');
    }
  return (
    <div>
            <div className="w-1/4 bg-gray-300 p-4">
      {/* Example buttons in different colors */}
      <DraggableButton text="Frame" onClick={() => handleButtonClick("Frame", "border-2 border-black")} />
      <DraggableButton text="Button" onClick={() => handleButtonClick("Button", "bg-blue-500 text-white")} />
      <DraggableButton text="Navbar" onClick={() => handleButtonClick("Navbar", "bg-gray-800 text-white")} />
      {/* Add more buttons with different styles as needed */}
    </div>
    </div>
  )
}

export default DesignPanel