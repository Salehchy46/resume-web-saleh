// src/components/CanvasCursor.jsx
import React from 'react';
import useCanvasCursor from '../hooks/useCanvasCursor';

const CanvasCursor = () => {
  const canvasRef = useCanvasCursor();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // allows clicking through
        zIndex: 9999,
        // ensure the canvas itself has no background
        background: 'transparent',
      }}
    />
  );
};

export default CanvasCursor;