// src/pages/VoicesAndSupport.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Mail, MessageSquare, ThumbsUp, User, Heart, Sparkles } from 'lucide-react';

const VoicesAndSupport = () => {
  // ----- State -----
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ rating: 0, email: '', comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  // ----- Load reviews from local storage -----
  useEffect(() => {
    const stored = localStorage.getItem('reviews');
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReviews(JSON.parse(stored));
    } else {
      // Dummy initial reviews
      const initialReviews = [
        {
          id: Date.now() + 1,
          rating: 5,
          email: 'sarah@example.com',
          comment: 'Absolutely loved working with Saleh! The attention to detail is outstanding.',
          timestamp: new Date().toISOString(),
          likes: 3,
        },
        {
          id: Date.now() + 2,
          rating: 4,
          email: 'mentor@dev.com',
          comment: 'Great mentor – always willing to help. Keep shining!',
          timestamp: new Date().toISOString(),
          likes: 1,
        },
      ];
      setReviews(initialReviews);
      localStorage.setItem('reviews', JSON.stringify(initialReviews));
    }
  }, []);

  // ----- Save to local storage whenever reviews change -----
  useEffect(() => {
    if (reviews.length) localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // ----- Helper: generate anonymous email -----
  const generateAnonymousEmail = () => {
    const randomId = Math.floor(Math.random() * 10000);
    return `user${randomId}@gmail.com`;
  };

  // ----- Submit handler -----
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!formData.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    setIsSubmitting(true);

    // Auto‑generate email if empty or invalid
    let finalEmail = formData.email.trim();
    if (finalEmail === '') {
      finalEmail = generateAnonymousEmail();
    } else if (!/^\S+@\S+\.\S+$/.test(finalEmail)) {
      alert('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    const newReview = {
      id: Date.now(),
      rating: formData.rating,
      email: finalEmail,
      comment: formData.comment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    setReviews((prev) => [newReview, ...prev]);
    setFormData({ rating: 0, email: '', comment: '' });
    setHoverRating(0);
    setSuccessMsg('✨ Your feedback has been posted!');
    setTimeout(() => setSuccessMsg(''), 3000);
    setIsSubmitting(false);
  };

  // ----- Like handler -----
  const handleLike = (reviewId) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === reviewId ? { ...rev, likes: rev.likes + 1 } : rev
      )
    );
  };

  // ----- Helper: mask email (first 3 chars + *** + domain) -----
  const maskEmail = (email) => {
    const [local, domain] = email.split('@');
    if (local.length <= 3) return `${local}***@${domain}`;
    const maskedLocal = local.slice(0, 3) + '***';
    return `${maskedLocal}@${domain}`;
  };

  // ----- Star Rating Component (inline) -----
  const renderStars = (rating, interactive = false, setter = null, hover = 0) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`cursor-pointer transition-all duration-150 ${
              (interactive ? (hover >= star ? 'scale-105' : '') : '')
            } ${
              star <= (interactive ? hover : rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-500 fill-none'
            }`}
            onMouseEnter={() => interactive && setter && setter(star)}
            onMouseLeave={() => interactive && setter && setter(0)}
            onClick={() => interactive && setter && setFormData({ ...formData, rating: star })}
          />
        ))}
      </div>
    );
  };

  // ----- Format timestamp (relative) -----
  const formatDate = (iso) => {
    const diff = Math.floor((new Date() - new Date(iso)) / 1000 / 60);
    if (diff < 1) return 'just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  // ----- Support people data -----
  const supporters = [
    {
      name: 'Affan Ahmed',
      role: 'Web Dev Mentor',
      message: 'Inspired me to dive into React and modern frameworks.',
      icon: <User size={32} />,
    },
    {
      name: 'Saif Uddin',
      role: 'Frontend Colleague',
      message: 'Always pushed me to learn better UI/UX and animations.',
      icon: <Sparkles size={32} />,
    },
    {
      name: 'Open Source Community',
      role: 'Contributors',
      message: 'Thank you for every PR review and endless support!',
      icon: <Heart size={32} />,
    },
    {
      name: 'You?',
      role: 'Future Collaborator',
      message: 'I’d love to include you here – let’s build something amazing together!',
      icon: <Star size={32} />,
    },
  ];

  // ----- Animation variants -----
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Voices & Support
          </h1>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Share your experience or appreciate people who inspire this journey.
          </p>
        </motion.div>

        {/* Review Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-blue-400" size={28} />
            <h2 className="text-2xl font-bold text-white">Leave a Review</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                <Star size={18} className="text-yellow-400" /> Your Rating
              </label>
              {renderStars(formData.rating, true, null, hoverRating)}
              <div className="flex mt-1 text-xs text-gray-400">
                {formData.rating === 0 && 'Click a star to rate'}
                {formData.rating === 1 && 'Needs improvement'}
                {formData.rating === 2 && 'Fair'}
                {formData.rating === 3 && 'Good'}
                {formData.rating === 4 && 'Very good'}
                {formData.rating === 5 && 'Excellent!'}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                <Mail size={18} /> Email (optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com (or leave blank to stay anonymous)"
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
              <p className="text-xs text-gray-400 mt-1">If left blank, a random anonymous ID will be used.</p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                <MessageSquare size={18} /> Your Comment
              </label>
              <textarea
                rows="4"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="What did you like? Any suggestions?"
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>Submit Feedback ✨</>
              )}
            </button>

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm bg-green-400/10 border border-green-400/30 rounded-lg p-2 text-center"
              >
                {successMsg}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Reviews Display Section */}
        <section className="mb-16">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Star className="text-yellow-500" fill="currentColor" /> Recent Reviews
            </h2>
            {reviews.length > visibleCount && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="text-blue-400 hover:text-blue-300 transition text-sm"
              >
                Load more →
              </button>
            )}
          </div>

          {reviews.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No reviews yet. Be the first!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {reviews.slice(0, visibleCount).map((rev, idx) => (
                  <motion.div
                    key={rev.id}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    variants={cardVariants}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 shadow-md hover:shadow-blue-500/10 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-700/60 rounded-full p-1.5">
                          <User size={16} className="text-gray-300" />
                        </div>
                        <span className="text-gray-200 text-sm font-mono">
                          {maskEmail(rev.email)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(rev.timestamp)}</span>
                    </div>

                    <div className="mb-3">{renderStars(rev.rating)}</div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{rev.comment}</p>

                    <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                      <button
                        onClick={() => handleLike(rev.id)}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                      >
                        <ThumbsUp size={16} /> <span>{rev.likes}</span>
                      </button>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Heart size={12} /> supported
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Support Section – People I Appreciate */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/40 rounded-2xl p-6 md:p-8 border border-gray-700/50"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">✨ People I Appreciate</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-3 rounded-full" />
              <p className="text-gray-400 mt-4">Mentors, friends & community who inspire this journey.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supporters.map((person, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-5 text-center border border-gray-700 hover:border-blue-500/30 shadow-md"
                >
                  <div className="text-blue-400 mb-3 flex justify-center">{person.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                  <p className="text-xs text-blue-400 mb-2">{person.role}</p>
                  <p className="text-gray-300 text-sm">{person.message}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default VoicesAndSupport;