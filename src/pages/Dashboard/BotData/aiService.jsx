// src/services/chatMessageService.js
const STORAGE_KEY = 'chat_messages';

// Load messages from localStorage (mock backend)
const loadMessages = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // mock demo messages
  const demo = [
    {
      id: Date.now(),
      sessionId: 'demo-session-1',
      userEmail: 'client@example.com',
      userName: 'John Doe',
      messages: [
        { role: 'user', content: 'I need a landing page for my startup', timestamp: new Date().toISOString() },
        { role: 'assistant', content: 'That sounds exciting! Can you tell me more about your brand and timeline?', timestamp: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
  return demo;
};

// eslint-disable-next-line no-unused-vars
const delay = (ms) => new Promise(resolve => setTimeout(resolve, 300));

export const saveChatMessage = async (sessionId, messageData) => {
  // messageData: { role, content, timestamp }
  let conversations = loadMessages();
  let conv = conversations.find(c => c.sessionId === sessionId);
  if (!conv) {
    conv = {
      id: Date.now(),
      sessionId,
      messages: [],
      createdAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      userName: '',
      userEmail: '',
    };
    conversations.push(conv);
  }
  conv.messages.push(messageData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  return { success: true };
};

export const endConversation = async (sessionId, userInfo = {}) => {
  let conversations = loadMessages();
  let conv = conversations.find(c => c.sessionId === sessionId);
  if (conv) {
    conv.userName = userInfo.name || '';
    conv.userEmail = userInfo.email || '';
    conv.endedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }
  return { success: true };
};

export const fetchChatConversations = async () => {
  await delay();
  const conversations = loadMessages();
  return { success: true, data: conversations.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) };
};

export const fetchConversationById = async (id) => {
  await delay();
  const conversations = loadMessages();
  const conv = conversations.find(c => c.id === id);
  return { success: true, data: conv };
};