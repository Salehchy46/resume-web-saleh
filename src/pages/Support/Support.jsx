// src/pages/Support/Support.jsx
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  HelpCircle,
  FileText,
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react';

const Support = () => {

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero */}
      <section className="relative bg-linear-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Support Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            How can I help you today? Find answers or reach out directly.
          </motion.p>
        </div>
      </section>

      {/* Quick Support Options */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/30 transition"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-blue-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-gray-400 text-sm mb-4">Get instant answers</p>
              <a
                href="https://wa.me/8801835069946"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                Start chat <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/30 transition"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
              <p className="text-gray-400 text-sm mb-4">Reply within 24 hours</p>
              <a
                href="mailto:Salehchyctg@gmail.com"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                Salehchyctg@gmail.com <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/30 transition"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Call / WhatsApp</h3>
              <p className="text-gray-400 text-sm mb-4">Mon–Fri, 9am–6pm (GMT+6)</p>
              <a
                href="tel:+8801835069946"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                +880 1835-069946 <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Support;