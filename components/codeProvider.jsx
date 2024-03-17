import React from 'react'

const CodeProvider = () => {

    const jsxCode = `
    <div>
      <button className="bg-blue-500 text-white">Click Me</button>
      {/* Include other components and their styles here */}
    </div>
  `;
  return (

    <div>  
     <div className="w-1/4 bg-gray-300 p-4">
    <h2 className="text-xl font-bold mb-4">Generated JSX Code</h2>
    <pre>{jsxCode}</pre>
  </div></div>
  )
}

export default CodeProvider