// components/DraggableButton.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableButton = ({ position }) => {
    console.log('Rendering DraggableButton at position:', position);

  const [, drag] = useDrag({
    type: 'BUTTON',
  });

  return (
    <div
      ref={drag}
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      {/* Your button component goes here */}
      <button className="rounded-full px-4 py-2 bg-blue-500 text-white uppercase">Button</button>
    </div>
  );
};

export default DraggableButton;
