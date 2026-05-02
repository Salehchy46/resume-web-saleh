// src/components/dashboard/DashboardNavbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FolderGit2,
  MessageSquare,
  Settings,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const DashboardNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/dashboard', name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/analytics', name: 'Analytics', icon: <BarChart3 size={20} /> },
    { path: '/dashboard/projects', name: 'Projects', icon: <FolderGit2 size={20} /> },
    { path: '/dashboard/reviews', name: 'Reviews', icon: <MessageSquare size={20} /> },
    { path: '/dashboard/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-gray-800/80 backdrop-blur-lg border-b border-gray-700">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Left section */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition"
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <LayoutDashboard size={18} className="text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hidden sm:inline">
                Dashboard
              </span>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-700 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-200">Saleh</span>
                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
              </button>

              {/* Dropdown menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2 z-40">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">Mohammad Saleh</p>
                    <p className="text-xs text-gray-400">Salehchyctg@gmail.com</p>
                  </div>
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
                  >
                    <User size={16} /> Your Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
                  >
                    <Settings size={16} /> Settings
                  </NavLink>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition w-full">
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar (desktop & mobile drawer) */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-800/90 backdrop-blur-lg border-r border-gray-700
          transition-transform duration-300 ease-in-out z-20
          w-64 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="flex flex-col h-full py-6">
          <div className="flex-1 space-y-1 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Sidebar footer */}
          <div className="px-3 pt-6 mt-6 border-t border-gray-700">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-white">Saleh</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-15 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardNavbar;