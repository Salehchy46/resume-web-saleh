// src/pages/Blog/BlogPost.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react';
import blogPostsData from '../../assets/jsons/blogPost.json';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPostsData.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition mb-8"
        >
          <ArrowLeft size={18} /> Back to all posts
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-300">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
              MS
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{post.author}</h3>
              <p className="text-gray-400 text-sm">
                Frontend developer, mentor, and lifelong learner. I write about web development, career growth, and my journey.
              </p>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;