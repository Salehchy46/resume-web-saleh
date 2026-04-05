"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Navigation links as an array – easy to extend
    const navLinks = [
        { text: "Home", to: "/" },
        { text: "About", to: "/about" },
        { text: "Services", to: "/services" },
        { text: "Contact", to: "/contact" }
    ];

    return (
        <header className={`w-full transition-all duration-300 ${
            isScrolled
                ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg'
                : 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-md'
        } border-b border-gray-200 dark:border-gray-800`}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-350">
                <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="" className="flex items-center rounded-full">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-900 dark:bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-110">
                                <img className='rounded-full' src="https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png" alt="" />
                            </div>
                            <span className="font-bold text-lg sm:text-xl lg:text-3xl text-gray-900 ml-5 dark:text-gray-100">Saleh</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.text}
                                to={link.to}
                                className={({ isActive }) =>
                                    `text-sm lg:text-base font-medium transition-colors relative group ${
                                        isActive
                                            ? 'text-gray-900 dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`
                                }
                            >
                                {link.text}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 group-hover:w-full"></span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                        <a
                            href="#"
                            className="flex items-center space-x-1.5 lg:space-x-2 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:shadow-md"
                        >
                            <span>Resume</span>
                            <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
                        </a>
                        <button className="px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm hover:shadow-lg transform hover:scale-105">
                            Hire Me
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation Drawer */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="py-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.text}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-3 py-2.5 text-sm sm:text-base font-medium rounded-md transition-colors ${
                                            isActive
                                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`
                                    }
                                >
                                    {link.text}
                                </NavLink>
                            ))}
                            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
                                <a
                                    href="#"
                                    className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <span>Resume</span>
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                                <button className="px-3 py-2.5 text-sm font-medium bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                    Hire Me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;