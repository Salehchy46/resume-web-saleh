import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Mainlayout = () => {
    return (
        <div className=' bg-gray-900/80'>
            <Navbar className="max-w-350 mx-auto"></Navbar>
            <Outlet></Outlet>
            <Footer className="max-w-350 mx-auto"></Footer>
        </div>
    );
};

export default Mainlayout;