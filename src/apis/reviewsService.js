// src/services/reviewService.js
import { get, post, put, del } from './api';

// Public: get visible reviews
export const fetchReviews = async () => {
  const res = await get('/reviews');
  return res;
};

// Admin: get all reviews (including hidden)
export const fetchAllReviews = async () => {
  const res = await get('/reviews/admin');
  return res;
};

export const createReview = async (reviewData) => {
  const res = await post('/reviews', reviewData);
  return res;
};

export const likeReview = async (id) => {
  const res = await post(`/reviews/${id}/like`);
  return res;
};

export const updateReview = async (id, updates) => {
  const res = await put(`/reviews/${id}`, updates);
  return res;
};

export const deleteReview = async (id) => {
  const res = await del(`/reviews/${id}`);
  return res;
};