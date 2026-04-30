import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import NeuralGlow from '../components/NeuralGlow';
import FluidCursor from '../components/FluidCursor';
import SpotlightCursor from '../components/SpotLightCursor';


const CursorContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const location = useLocation();

  const getCursorComponent = () => {
  const { pathname } = location;
  if (pathname === '/work') return <NeuralGlow />;
  if (pathname === '/about') return <FluidCursor />;
  if (pathname === '/contact') return <SpotlightCursor />;
  return <CanvasCursor />; // default for home
};

  return (
    <CursorContext.Provider value={{}}>
      {children}
      {getCursorComponent()}
    </CursorContext.Provider>
  );
};