// src/services/reviewService.js
const STORAGE_KEY = 'reviews';

// Helper to load reviews from localStorage
const loadReviews = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // Default dummy reviews
  const defaultReviews = [
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReviews));
  return defaultReviews;
};

// eslint-disable-next-line no-unused-vars
const delay = (ms) => new Promise(resolve => setTimeout(resolve, 300));

export const fetchReviews = async () => {
  await delay();
  const reviews = loadReviews();
  return { success: true, data: reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) };
};

export const deleteReview = async (id) => {
  await delay();
  let reviews = loadReviews();
  const filtered = reviews.filter(r => r.id !== id);
  if (filtered.length === reviews.length) throw new Error('Review not found');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { success: true };
};

export const updateReviewStatus = async (id, updates) => {
  await delay();
  let reviews = loadReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Review not found');
  reviews[index] = { ...reviews[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return { success: true, data: reviews[index] };
};