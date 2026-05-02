// src/pages/dashboard/Settings.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { User, Lock, Bell, Save, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Settings = () => {
  // Profile State
  const [profile, setProfile] = useState({
    name: 'Mohammad Saleh',
    email: 'Salehchyctg@gmail.com',
    phone: '+880 1835-069946',
    bio: 'Frontend developer with 3+ years of experience. Passionate about React, Tailwind, and creating beautiful web experiences.',
    location: 'Chattogram, Bangladesh',
    website: 'https://salehchy46-portfolio.netlify.app',
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newMessageAlerts: true,
    projectUpdates: true,
    marketingEmails: false,
  });

  // UI States
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  // Load saved settings from localStorage (mock)
  useEffect(() => {
    const savedProfile = localStorage.getItem('dashboard_profile');
    const savedNotifications = localStorage.getItem('dashboard_notifications');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  // Profile update handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    localStorage.setItem('dashboard_profile', JSON.stringify(profile));
    showMessage('success', 'Profile updated successfully!');
    setSaving(false);
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    // In real app, send to backend
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showMessage('success', 'Password changed successfully!');
    setSaving(false);
  };

  // Notifications handler
  const handleNotificationChange = async (key, value) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('dashboard_notifications', JSON.stringify(updated));
    showMessage('success', 'Notification preferences saved');
  };

  // Demo: Account deletion (just a warning for now)
  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion would be processed here.');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'password', label: 'Security', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  ];

  return (
    <div className="relative right-32 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account preferences and security</p>
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-3 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-700 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/5'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <form onSubmit={handleProfileUpdate} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Bio</label>
              <textarea
                rows="3"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white resize-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'} <Save size={16} />
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <form onSubmit={handlePasswordChange} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && <p className="text-red-400 text-xs mt-1">{errors.currentPassword}</p>}
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-sm">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>}
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-white"
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Update Password'} <Lock size={16} />
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive emails about your account activity' },
              { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get browser notifications for important updates' },
              { key: 'newMessageAlerts', label: 'New Message Alerts', desc: 'Alert when someone contacts you via the website' },
              { key: 'projectUpdates', label: 'Project Updates', desc: 'Receive updates about your projects' },
              { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Occasional newsletters and offers' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-700/50 last:border-0">
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Danger Zone (common in settings) */}
      <div className="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
        <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
        <p className="text-gray-400 text-sm mb-4">Once you delete your account, there is no going back. All data will be permanently removed.</p>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;