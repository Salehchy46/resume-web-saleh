// src/services/chatMessageService.js
import { get, post, put } from './api';

// Start conversation
export const startConversation = async (sessionId) => {
  const res = await post('/chat/start', { session_id: sessionId });
  return res;
};

// Save a single message (user or assistant)
export const saveChatMessage = async (sessionId, { role, content, timestamp }) => {
  const res = await post('/chat/message', { session_id: sessionId, role, content, timestamp });
  return res;
};

// Admin: get all conversations
export const fetchConversations = async () => {
  const res = await get('/chat/conversations');
  return res;
};

// Admin: get single conversation
export const fetchConversation = async (id) => {
  const res = await get(`/chat/conversations/${id}`);
  return res;
};

// End conversation with user info
export const endConversation = async (sessionId, { name, email }) => {
  const res = await put(`/chat/conversations/${sessionId}/user`, { name, email });
  return res;
};