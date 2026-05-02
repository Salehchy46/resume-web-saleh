// src/layouts/Dashboard.jsx
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FolderGit2,
  MessageSquare,
  Settings,
  Package,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';
import ScrollToTop from '../components/ScrolToTop';
import Header from '../shared/Navbar';
import Footer from '../shared/Footer';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isAdmin = true; // TODO: replace with actual user role from auth

  const navItems = [
    { path: '/personalDashboard/overview', label: 'Overview', icon: <LayoutDashboard size={20} />, adminOnly: false },
    { path: '/personalDashboard/orders', label: 'Orders', icon: <Package size={20} />, adminOnly: true },
    { path: '/personalDashboard/sharedProjects', label: 'Shared Projects', icon: <BarChart3 size={20} />, adminOnly: true },
    { path: '/personalDashboard/projects', label: 'Projects', icon: <FolderGit2 size={20} />, adminOnly: true },
    { path: '/personalDashboard/reviews', label: 'Reviews', icon: <MessageSquare size={20} />, adminOnly: true },
    { path: '/personalDashboard/botdata', label: 'Bot Data', icon: <MessageSquare size={20} />, adminOnly: true },
    { path: '/personalDashboard/settings', label: 'Settings', icon: <Settings size={20} />, adminOnly: false },
  ];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className=" min-h-screen bg-gray-900">
      <ScrollToTop />
      <Header />
      <div className="flex relative">
        {/* Drawer Overlay (mobile only) */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Sidebar Drawer */}
        <aside
          className={`
            fixed top-0 left-0 z-50 w-64 h-full bg-gray-800/95 backdrop-blur-lg border-r border-gray-700
            transition-transform duration-300 ease-in-out transform
            ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:z-auto
          `}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header with close button (mobile only) */}
            <div className="flex items-center justify-between p-5 border-b border-gray-700">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <button
                onClick={toggleDrawer}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                if (item.adminOnly && !isAdmin) return null;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/personalDashboard/overview'}
                    onClick={() => setIsDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-700">
              <NavLink
                to="/"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-gray-700/50 transition"
                onClick={() => setIsDrawerOpen(false)}
              >
                <ChevronLeft size={20} />
                <span>Back to Site</span>
              </NavLink>
              <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition w-full mt-2">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen bg-gray-900">
          {/* Hamburger button to open drawer (only visible when drawer is closed on mobile/tablet) */}
          {!isDrawerOpen && (
            <button
              onClick={toggleDrawer}
              className="fixed left-4 top-20 z-30 p-2 bg-gray-800 rounded-lg shadow-lg lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-white" />
            </button>
          )}

          {/* Centered content like main website */}
          <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;