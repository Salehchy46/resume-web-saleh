// src/services/orderService.js
// Replace with your actual API endpoint when ready
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.yourdomain.com';

// Mock data for development/demo
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    amount: 1299,
    currency: 'USD',
    status: 'pending',
    items: 3,
    date: '2025-05-01T10:30:00Z',
    project: 'E-commerce Website',
  },
  {
    id: 'ORD-002',
    customerName: 'Michael Chen',
    customerEmail: 'michael@example.com',
    amount: 2499,
    currency: 'USD',
    status: 'processing',
    items: 1,
    date: '2025-04-28T14:15:00Z',
    project: 'React Dashboard',
  },
  {
    id: 'ORD-003',
    customerName: 'Emma Watson',
    customerEmail: 'emma@example.com',
    amount: 899,
    currency: 'USD',
    status: 'completed',
    items: 2,
    date: '2025-04-25T09:45:00Z',
    project: 'Landing Page Design',
  },
  {
    id: 'ORD-004',
    customerName: 'David Kim',
    customerEmail: 'david@example.com',
    amount: 3499,
    currency: 'USD',
    status: 'pending',
    items: 4,
    date: '2025-05-02T11:20:00Z',
    project: 'WordPress Site',
  },
  {
    id: 'ORD-005',
    customerName: 'Lisa Brown',
    customerEmail: 'lisa@example.com',
    amount: 1899,
    currency: 'USD',
    status: 'shipped',
    items: 2,
    date: '2025-04-29T16:00:00Z',
    project: 'Mobile App UI',
  },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchOrders = async (filters = {}) => {
  // When backend is ready, replace with actual fetch
  // const response = await fetch(`${API_BASE_URL}/orders`, {
  //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  // });
  // return response.json();

  await delay(800); // simulate network delay
  let orders = [...mockOrders];
  
  if (filters.status && filters.status !== 'all') {
    orders = orders.filter(order => order.status === filters.status);
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    orders = orders.filter(order => 
      order.customerName.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower) ||
      order.project.toLowerCase().includes(searchLower)
    );
  }
  // Sort by date descending
  orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return { success: true, data: orders, total: orders.length };
};

export const updateOrderStatus = async (orderId, newStatus) => {
  // Mock update
  await delay(500);
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = newStatus;
    return { success: true, data: mockOrders[orderIndex] };
  }
  throw new Error('Order not found');
};

export const deleteOrder = async (orderId) => {
  await delay(500);
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    mockOrders.splice(orderIndex, 1);
    return { success: true };
  }
  throw new Error('Order not found');
};