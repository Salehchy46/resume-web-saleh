// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get stored token
const getToken = () => localStorage.getItem('admin_token');

// Generic fetch wrapper
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const config = {
    ...options,
    headers,
  };
  const response = await fetch(url, config);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

export const get = (endpoint) => request(endpoint, { method: 'GET' });
export const post = (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) });
export const put = (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
export const patch = (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) });
export const del = (endpoint) => request(endpoint, { method: 'DELETE' });

export default { get, post, put, patch, delete: del };