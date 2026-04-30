// src/components/FluidCursor.jsx
import React from 'react';
import useFluidCursor from '../hooks/useFluidCursor';

const FluidCursor = () => {
  const canvasRef = useFluidCursor({
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 640,
    SHADING: true,
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default FluidCursor;