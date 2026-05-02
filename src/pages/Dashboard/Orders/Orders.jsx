// src/pages/Dashboard/Orders.jsx
import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  DollarSign,
  User,
  Calendar,
  Loader2,
} from 'lucide-react';
import { fetchOrders, updateOrderStatus, deleteOrder } from './orderServices';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', search: '' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, [filters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchOrders(filters);
      if (result.success) {
        setOrders(result.data);
        setCurrentPage(1);
      } else {
        setError('Failed to load orders');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  const handleStatusChange = async (orderId, newStatus) => {
    setActionLoading(true);
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        await loadOrders();
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    setActionLoading(true);
    try {
      const result = await deleteOrder(orderId);
      if (result.success) {
        await loadOrders();
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Failed to delete order');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { icon: <Clock size={14} />, color: 'bg-yellow-500/20 text-yellow-400', label: 'Pending' },
      processing: { icon: <Loader2 size={14} className="animate-spin" />, color: 'bg-blue-500/20 text-blue-400', label: 'Processing' },
      completed: { icon: <CheckCircle size={14} />, color: 'bg-green-500/20 text-green-400', label: 'Completed' },
      shipped: { icon: <Truck size={14} />, color: 'bg-purple-500/20 text-purple-400', label: 'Shipped' },
      cancelled: { icon: <XCircle size={14} />, color: 'bg-red-500/20 text-red-400', label: 'Cancelled' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="lg:relative lg:right-30 min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Orders
            </h1>
            <p className="text-gray-400 mt-1">Manage and track all client orders</p>
          </div>
          <button
            onClick={loadOrders}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or project..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No orders found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Project / Items</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {currentOrders.map((order, idx) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                      >
                        <td className="py-4 font-mono text-sm">{order.id}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{order.customerName}</p>
                              <p className="text-xs text-gray-400">{order.customerEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="text-sm">{order.project}</p>
                            <p className="text-xs text-gray-400">{order.items} item(s)</p>
                          </div>
                        </td>
                        <td className="py-4 font-semibold text-cyan-400">
                          {formatCurrency(order.amount, order.currency)}
                        </td>
                        <td className="py-4 text-sm text-gray-300">{formatDate(order.date)}</td>
                        <td className="py-4">{getStatusBadge(order.status)}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              disabled={actionLoading}
                              className="text-xs bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:border-blue-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-1 text-gray-400 hover:text-blue-400 transition"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(order.id)}
                              className="p-1 text-gray-400 hover:text-red-400 transition"
                              disabled={actionLoading}
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 hover:bg-gray-700 transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 hover:bg-gray-700 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-blue-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white">
                  <XCircle size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Order ID</span>
                  <span className="font-mono text-sm">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Customer</span>
                  <span>{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Email</span>
                  <span className="text-sm">{selectedOrder.customerEmail}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Project</span>
                  <span>{selectedOrder.project}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Items</span>
                  <span>{selectedOrder.items}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-cyan-400">{formatCurrency(selectedOrder.amount, selectedOrder.currency)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Date</span>
                  <span>{formatDate(selectedOrder.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <select
                  value={selectedOrder.status}
                  onChange={async (e) => {
                    await handleStatusChange(selectedOrder.id, e.target.value);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Orders;