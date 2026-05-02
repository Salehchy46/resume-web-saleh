// src/pages/Blog/Blog.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ChevronRight, Search } from 'lucide-react';
import blogPostsData from '../../assets/jsons/blogPost.json';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  useEffect(() => {
    // Sort posts by date (newest first)
    const sorted = [...blogPostsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts(sorted);
  }, []);

  // Extract all unique tags
  const allTags = ['all', ...new Set(blogPostsData.flatMap(post => post.tags))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'all' || post.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <section className="relative bg-linear-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Thoughts, tutorials, and stories from my development journey.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-800/30 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    filterTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p>No posts found. Try a different search or tag.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group hover:-translate-y-1 overflow-hidden"
                >
                  <Link to={`/blog/${post.id}`} className="block p-6">
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-400 text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                      Read more <ChevronRight size={14} />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;