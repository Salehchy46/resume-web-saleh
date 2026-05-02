import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
    Users, Eye, ThumbsUp, MessageSquare, TrendingUp, Activity, Calendar,
    Briefcase, FileText, Star, ChevronRight, Bell, Settings, LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = () => {
   

    // Sample data for charts
    const visitorData = [
        { name: 'Mon', visitors: 240 },
        { name: 'Tue', visitors: 300 },
        { name: 'Wed', visitors: 280 },
        { name: 'Thu', visitors: 350 },
        { name: 'Fri', visitors: 420 },
        { name: 'Sat', visitors: 380 },
        { name: 'Sun', visitors: 310 },
    ];

    const revenueData = [
        { name: 'Jan', revenue: 1200 },
        { name: 'Feb', revenue: 1900 },
        { name: 'Mar', revenue: 1500 },
        { name: 'Apr', revenue: 2100 },
        { name: 'May', revenue: 2400 },
        { name: 'Jun', revenue: 2800 },
    ];

    // eslint-disable-next-line no-unused-vars
    const reviewRatings = [
        { name: '5 ★', value: 45, color: '#10b981' },
        { name: '4 ★', value: 28, color: '#3b82f6' },
        { name: '3 ★', value: 15, color: '#f59e0b' },
        { name: '2 ★', value: 8, color: '#ef4444' },
        { name: '1 ★', value: 4, color: '#6b7280' },
    ];

    const recentReviews = [
        { id: 1, name: 'Sarah Johnson', rating: 5, comment: 'Amazing work! Highly recommend.', date: '2025-04-28' },
        { id: 2, name: 'Michael Chen', rating: 4, comment: 'Great developer, very responsive.', date: '2025-04-27' },
        { id: 3, name: 'Emma Watson', rating: 5, comment: 'Exceeded expectations!', date: '2025-04-25' },
    ];

    const recentProjects = [
        { id: 1, title: 'Sports Equipment Store', status: 'Completed', date: '2025-04-20' },
        { id: 2, title: 'Hurrida Agency Site', status: 'In Progress', date: '2025-04-15' },
        { id: 3, title: 'Personal Portfolio', status: 'Live', date: '2025-04-10' },
    ];

    const notifications = [
        { id: 1, message: 'New review from Sarah ⭐⭐⭐⭐⭐', time: '2 hours ago', read: false },
        { id: 2, message: 'Your project "Sports Store" went live!', time: '5 hours ago', read: false },
        { id: 3, message: 'Monthly traffic up 23% this month', time: '1 day ago', read: true },
    ];

    const stats = [
        { title: 'Total Visitors', value: '2,847', change: '+12%', icon: <Eye className="text-blue-400" />, color: 'from-blue-600 to-blue-400' },
        { title: 'Client Reviews', value: '128', change: '+8%', icon: <MessageSquare className="text-green-400" />, color: 'from-green-600 to-green-400' },
        { title: 'Projects Done', value: '24', change: '+15%', icon: <Briefcase className="text-purple-400" />, color: 'from-purple-600 to-purple-400' },
        { title: 'Avg Rating', value: '4.8', change: '+5%', icon: <Star className="text-yellow-400" />, color: 'from-yellow-600 to-yellow-400' },
    ];

    return (
        <div>
            {/* Main Content */}
            <div className="lg:relative lg:right-32 max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 hover:border-blue-500/30 transition"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                                    {stat.icon}
                                </div>
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <TrendingUp size={12} /> {stat.change}
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-sm text-gray-400">{stat.title}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Line Chart - Visitors */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Weekly Visitors</h3>
                            <select className="bg-gray-700 text-xs rounded-lg px-2 py-1 border border-gray-600">
                                <option>This week</option>
                                <option>Last week</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={visitorData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Bar Chart - Revenue */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Monthly Revenue (৳)</h3>
                            <select className="bg-gray-700 text-xs rounded-lg px-2 py-1 border border-gray-600">
                                <option>2025</option>
                                <option>2024</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                <Bar dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Reviews & Projects Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Recent Reviews */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Reviews</h3>
                            <Link to="/voiceAndSupport" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                                View all <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentReviews.map((review) => (
                                <div key={review.id} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-xl">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                                        ))}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">{review.name}</p>
                                        <p className="text-xs text-gray-400 line-clamp-1">{review.comment}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Projects */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
                            <Link to="/work" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                                View all <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                                    <div>
                                        <p className="text-sm font-medium text-white">{project.title}</p>
                                        <p className="text-xs text-gray-400">{project.date}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                        project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Notifications & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                        <div className="space-y-3">
                            {notifications.map((notif) => (
                                <div key={notif.id} className={`flex items-center gap-3 p-3 rounded-xl transition ${!notif.read ? 'bg-blue-500/10' : 'hover:bg-gray-700/30'}`}>
                                    <div className={`w-2 h-2 rounded-full ${!notif.read ? 'bg-blue-400' : 'bg-gray-600'}`} />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-200">{notif.message}</p>
                                        <p className="text-xs text-gray-500">{notif.time}</p>
                                    </div>
                                    <button className="text-xs text-blue-400 hover:underline">Mark read</button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link to="/blog/new" className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition">
                                <FileText size={18} className="text-blue-400" />
                                <span className="text-sm">Write new blog post</span>
                            </Link>
                            <Link to="/portfolio/add" className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition">
                                <Briefcase size={18} className="text-green-400" />
                                <span className="text-sm">Add portfolio project</span>
                            </Link>
                            <Link to="/settings" className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition">
                                <Settings size={18} className="text-purple-400" />
                                <span className="text-sm">Dashboard settings</span>
                            </Link>
                            <button className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition w-full text-left">
                                <LogOut size={18} className="text-red-400" />
                                <span className="text-sm text-red-400">Log out</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Overview;