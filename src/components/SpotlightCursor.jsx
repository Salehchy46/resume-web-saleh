// src/components/SpotlightCursor.jsx
import React from 'react';
import useSpotlightEffect from '../hooks/useSpotlightEffect';

const SpotlightCursor = () => {
  const canvasRef = useSpotlightEffect({
    spotlightSize: 250,
    spotlightIntensity: 0.7,
    fadeSpeed: 0.08,
    glowColor: '59, 130, 246', // blue
    pulseSpeed: 2500,
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

export default SpotlightCursor;