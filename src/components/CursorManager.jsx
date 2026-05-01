// src/components/CursorManager.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import NeuralGlow from './NeuralGlow';
import FluidCursor from './FluidCursor';
import SpotlightCursor from './SpotLightCursor';
import CanvasCursor from './CanvasCursor';
import TextFlagCursor from './TextFlagCursor';


const CursorManager = () => {
  const { pathname } = useLocation();

  if (pathname === '/work') return <NeuralGlow />;
  if (pathname === '/about') return <FluidCursor />;
  if (pathname === '/contact') return <TextFlagCursor />;
  return <CanvasCursor />; 
};

export default CursorManager;