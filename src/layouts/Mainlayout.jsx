import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Mainlayout = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="grow relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;