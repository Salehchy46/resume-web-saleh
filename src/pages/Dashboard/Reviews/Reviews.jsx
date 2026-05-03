/* eslint-disable no-unused-vars */
// src/pages/dashboard/Reviews.jsx
import React, { useState, useEffect } from 'react';
 
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, Eye, CheckCircle, XCircle, Mail, Calendar, ThumbsUp } from 'lucide-react';
import { fetchReviews, deleteReview, updateReview } from '../../../apis/reviewsService';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetchReviews();
      if (res.success) setReviews(res.data);
      else setError('Failed to load reviews');
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    setActionLoading(true);
    try {
      await deleteReview(id);
      await loadReviews();
    } catch (err) {
      alert('Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleVisibilityToggle = async (id, currentVisible) => {
    // You can add a 'visible' field to reviews if not present; here we'll just delete or we can add a soft delete.
    // For demo, we'll update a 'hidden' flag.
    await updateReview(id, { hidden: !currentVisible });
    await loadReviews();
  };

  const maskEmail = (email) => {
    const [local, domain] = email.split('@');
    if (local.length <= 3) return `${local}***@${domain}`;
    return `${local.slice(0, 3)}***@${domain}`;
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(star => (
          <Star key={star} size={14} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = rev.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rev.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || rev.rating === parseInt(filterRating);
    return matchesSearch && matchesRating;
  });

  return (
    <div className='lg:relative lg:right-30 max-w-7xl mx-auto'>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Reviews</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by email or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-blue-500 outline-none"
          />
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 ★</option>
            <option value="4">4 ★</option>
            <option value="3">3 ★</option>
            <option value="2">2 ★</option>
            <option value="1">1 ★</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading reviews...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-400">{error}</div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No reviews found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr className="text-gray-400 text-sm">
                <th className="pb-3 font-medium">Reviewer</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Comment</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-center">Likes</th>
                <th className="pb-3 font-medium text-center">Actions</th>
               </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredReviews.map((review, idx) => (
                  <motion.tr
                    key={review.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="border-b border-gray-800 hover:bg-gray-800/30"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-sm font-mono">{maskEmail(review.email)}</span>
                      </div>
                    </td>
                    <td className="py-3">{renderStars(review.rating)}</td>
                    <td className="py-3">
                      <p className="text-sm text-gray-300 max-w-md line-clamp-2">{review.comment}</p>
                    </td>
                    <td className="py-3 text-xs text-gray-400">{formatDate(review.timestamp)}</td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-400">
                        <ThumbsUp size={14} /> {review.likes || 0}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="text-gray-400 hover:text-red-400 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Summary stats */}
      {!loading && reviews.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800/30 rounded-xl flex flex-wrap gap-6 justify-between items-center">
          <div className="text-sm text-gray-400">
            Total reviews: <span className="text-white font-bold">{reviews.length}</span>
          </div>
          <div className="text-sm text-gray-400">
            Average rating: <span className="text-yellow-400 font-bold">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)} ★
            </span>
          </div>
          <button
            onClick={loadReviews}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;