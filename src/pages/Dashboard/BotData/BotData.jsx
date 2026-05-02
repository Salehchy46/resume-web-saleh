// src/pages/dashboard/BotData.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MessageSquare, Eye, Mail, User, Calendar, ChevronRight } from 'lucide-react';
import { fetchChatConversations, fetchConversationById } from './aiService';

const BotData = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const res = await fetchChatConversations();
      if (res.success) setConversations(res.data);
    } catch (error) {
      console.error('Failed to load', error);
    } finally {
      setLoading(false);
    }
  };

  const viewConversation = async (id) => {
    const res = await fetchConversationById(id);
    if (res.success) setSelectedConv(res.data);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.sessionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='relative right-25 max-w-7xl'>
      <div className=" flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">AI Assistant Conversations</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, session..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm w-64 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading conversations...</div>
      ) : filteredConversations.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No conversations yet.</div>
      ) : (
        <div className="grid gap-4">
          {filteredConversations.map((conv, idx) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500/30 transition cursor-pointer"
              onClick={() => viewConversation(conv.id)}
            >
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare size={18} className="text-blue-400" />
                    <span className="font-mono text-xs text-gray-400">ID: {conv.sessionId.slice(-8)}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {conv.userName && (
                      <div className="flex items-center gap-1 text-gray-300">
                        <User size={14} /> {conv.userName}
                      </div>
                    )}
                    {conv.userEmail && (
                      <div className="flex items-center gap-1 text-gray-300">
                        <Mail size={14} /> {conv.userEmail}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Calendar size={12} /> {new Date(conv.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-2 text-gray-400 text-sm line-clamp-2">
                    {conv.messages[0]?.content.substring(0, 100)}...
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                    {conv.messages.length} messages
                  </span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for full conversation */}
      {selectedConv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedConv(null)}>
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-blue-500/30" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Conversation Details</h3>
              <button onClick={() => setSelectedConv(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedConv.messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                    <p className="text-xs text-gray-300 mb-1">{msg.role === 'user' ? 'Visitor' : 'AI Assistant'}</p>
                    <p>{msg.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
              Session ID: {selectedConv.sessionId}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotData;