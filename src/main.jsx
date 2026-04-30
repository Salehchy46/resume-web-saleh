import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router.jsx';
import { CursorProvider } from './context/CursorProvider.jsx';
import ScrollToTop from './components/ScrolToTop.jsx';
import TargetCursor from './components/TargetCursor.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TargetCursor></TargetCursor>
    <RouterProvider router={router} />
  </StrictMode>
);