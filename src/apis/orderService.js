// src/services/orderService.js
import { get, post, patch, del } from './api';

// Admin only
export const fetchOrders = async () => {
  const res = await get('/orders');
  return res;
};

// Public: create new order (contact form order)
export const createOrder = async (orderData) => {
  const res = await post('/orders', orderData);
  return res;
};

// Admin: update order status
export const updateOrderStatus = async (id, status) => {
  const res = await patch(`/orders/${id}/status`, { status });
  return res;
};

export const deleteOrder = async (id) => {
  const res = await del(`/orders/${id}`);
  return res;
};