// src/pages/VoicesAndSupport.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Mail, MessageSquare, ThumbsUp, User, Heart, AlertCircle } from 'lucide-react';
import { fetchReviews, createReview, likeReview } from '../../apis/reviewsService';

// ----- Star Rating Component (fully interactive) -----
const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`cursor-pointer transition-all duration-150 ${
            star <= (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400 scale-105'
              : 'text-gray-500 fill-none'
          }`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

const VoicesAndSupport = () => {
  // ----- State -----
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ rating: 0, email: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  // ----- Load reviews from API -----
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReviews();
        // ✅ Ensure data is an array
        const reviewsArray = Array.isArray(data) ? data : [];
        setReviews(reviewsArray);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setErrorMsg('Could not load reviews. Please refresh the page.');
        setReviews([]); // fallback to empty array
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, []);

  // ----- Helper: generate anonymous email -----
  const generateAnonymousEmail = () => {
    const randomId = Math.floor(Math.random() * 10000);
    return `user${randomId}@gmail.com`;
  };

  // ----- Submit handler (sends to dashboard via API) -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (formData.rating === 0) {
      setErrorMsg('Please select a rating');
      return;
    }
    if (!formData.comment.trim()) {
      setErrorMsg('Please write a comment');
      return;
    }

    setIsSubmitting(true);

    let finalEmail = formData.email.trim();
    if (finalEmail === '') {
      finalEmail = generateAnonymousEmail();
    } else if (!/^\S+@\S+\.\S+$/.test(finalEmail)) {
      setErrorMsg('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const newReview = await createReview({
        rating: formData.rating,
        email: finalEmail,
        comment: formData.comment.trim(),
      });
      // ✅ Prepend new review – safely assume previous state is array
      setReviews((prev) => [newReview, ...(Array.isArray(prev) ? prev : [])]);
      setFormData({ rating: 0, email: '', comment: '' });
      setSuccessMsg('✨ Your feedback has been posted! Thank you.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----- Like handler (calls API) -----
  const handleLike = async (reviewId) => {
    try {
      const updatedReview = await likeReview(reviewId);
      setReviews((prev) => {
        // ✅ Ensure we work with an array
        if (!Array.isArray(prev)) return [];
        return prev.map((rev) =>
          rev.id === reviewId ? { ...rev, likes: updatedReview.likes } : rev
        );
      });
    } catch (err) {
      console.error('Like error:', err);
      // Optionally show a toast error
    }
  };

  // ----- Helper: mask email -----
  const maskEmail = (email) => {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    if (local.length <= 3) return `${local}***@${domain}`;
    const maskedLocal = local.slice(0, 3) + '***';
    return `${maskedLocal}@${domain}`;
  };

  // ----- Format timestamp -----
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
      name: 'Affan Chowdhury',
      message: 'Inspired me to dive into Web Development.',
      icon: <User size={32} />,
      link: 'https://www.facebook.com/affan.chowdhuryMAC',
    },
    {
      name: 'Saif-Al-Islam',
      message: 'Always pushed me to learn better UI/UX and React.',
      icon: <User size={32} />,
      link: 'https://www.facebook.com/saif.alislam.3388630'
    },
    {
      name: 'Root Digital',
      message: 'Community that sparked my passion for coding and design.',
      icon: <Heart size={32} />,
      link: 'https://www.facebook.com/rootdigitaldhk'
    },
    {
      name: 'You?',
      message: 'I’d love to include you here – let’s build something amazing together!',
      icon: <Star size={32} />,
      link: null,
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

  // ----- Helper: rating label -----
  const getRatingLabel = (rating) => {
    switch(rating) {
      case 1: return 'Needs improvement';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very good';
      case 5: return 'Excellent!';
      default: return 'Click a star to rate';
    }
  };

  // ✅ Safely slice only if reviews is an array; otherwise treat as empty
  const displayedReviews = Array.isArray(reviews) ? reviews.slice(0, visibleCount) : [];

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
              <StarRating
                rating={formData.rating}
                onRatingChange={(newRating) => setFormData({ ...formData, rating: newRating })}
              />
              <div className="mt-1 text-xs text-gray-400">
                {getRatingLabel(formData.rating)}
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

            {errorMsg && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg p-3 text-sm">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

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
                <>Submit Feedback</>
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
            {Array.isArray(reviews) && reviews.length > visibleCount && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="text-blue-400 hover:text-blue-300 transition text-sm"
              >
                Load more →
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : !Array.isArray(reviews) || reviews.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No reviews yet. Be the first!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {displayedReviews.map((rev, idx) => (
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

                    <div className="mb-3">
                      <StarRating rating={rev.rating} onRatingChange={() => {}} />
                    </div>

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
              <h2 className="text-3xl font-bold text-white">People I Appreciate</h2>
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
                  className="bg-gray-800/80 flex flex-col justify-between backdrop-blur-sm rounded-xl p-5 text-center border border-gray-700 hover:border-blue-500/30 shadow-md"
                >
                  <div className="text-blue-400 mb-3 flex justify-center">{person.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                  <p className="text-gray-300 text-sm my-3">{person.message}</p>
                  {person.link ? (
                    <a
                      href={person.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-center"
                    >
                      Connect on Facebook
                    </a>
                  ) : (
                    <div className="mt-4 w-full px-4 py-2 bg-gray-700 rounded-xl text-gray-400 text-sm">
                      Be the next supporter
                    </div>
                  )}
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