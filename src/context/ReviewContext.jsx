import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ReviewContext = createContext();

// Sample reviews data
const sampleReviews = {
  '1': [
    {
      id: 101,
      userId: 'user@demo.com',
      userName: 'Rahul Sharma',
      rating: 4,
      comment: 'Bahut accha product hai! Mascara kaam kar raha hai.',
      date: '2024-03-15',
      helpful: 12,
      images: []
    },
    {
      id: 102,
      userId: 'priya@demo.com',
      userName: 'Priya Singh',
      rating: 5,
      comment: 'Awesome product! Highly recommended 👍',
      date: '2024-03-10',
      helpful: 8,
      images: []
    }
  ],
  '2': [
    {
      id: 201,
      userId: 'amit@demo.com',
      userName: 'Amit Kumar',
      rating: 3,
      comment: 'Average product. Expected better quality.',
      date: '2024-03-12',
      helpful: 3,
      images: []
    }
  ]
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const storedReviews = localStorage.getItem('product_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(sampleReviews);
      localStorage.setItem('product_reviews', JSON.stringify(sampleReviews));
    }
  }, []);

  const saveReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem('product_reviews', JSON.stringify(newReviews));
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const getAverageRating = (productId) => {
  const productReviews = reviews[productId] || [];
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  const avg = sum / productReviews.length;
  return Number(avg).toFixed(1);
};

  const getRatingCounts = (productId) => {
    const productReviews = reviews[productId] || [];
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    productReviews.forEach(review => {
      counts[review.rating]++;
    });
    
    return counts;
  };

  const addReview = (productId, rating, comment, images = []) => {
    if (!user) return false;

    const newReview = {
      id: Date.now(),
      userId: user.email,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      images
    };

    const updatedReviews = {
      ...reviews,
      [productId]: [...(reviews[productId] || []), newReview]
    };

    saveReviews(updatedReviews);
    return true;
  };

  const markHelpful = (productId, reviewId) => {
    const updatedReviews = { ...reviews };
    const productReviews = updatedReviews[productId];
    
    if (productReviews) {
      const reviewIndex = productReviews.findIndex(r => r.id === reviewId);
      if (reviewIndex !== -1) {
        productReviews[reviewIndex].helpful += 1;
        saveReviews(updatedReviews);
      }
    }
  };

  const hasUserReviewed = (productId) => {
    if (!user) return false;
    const productReviews = reviews[productId] || [];
    return productReviews.some(review => review.userId === user.email);
  };

  const deleteReview = (productId, reviewId) => {
    if (!user) return false;
    
    const updatedReviews = { ...reviews };
    const productReviews = updatedReviews[productId];
    
    if (productReviews) {
      const review = productReviews.find(r => r.id === reviewId);
      if (review && (review.userId === user.email || user.isAdmin)) {
        updatedReviews[productId] = productReviews.filter(r => r.id !== reviewId);
        saveReviews(updatedReviews);
        return true;
      }
    }
    return false;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      getProductReviews,
      getAverageRating,
      getRatingCounts,
      addReview,
      markHelpful,
      hasUserReviewed,
      deleteReview
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};