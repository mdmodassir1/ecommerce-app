import React, { useState } from 'react';
import { useReviews } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProductReviews.css';

const ProductReviews = ({ productId, productName }) => {
  const { 
    getProductReviews, 
    getAverageRating, 
    getRatingCounts,
    addReview,
    markHelpful,
    hasUserReviewed,
    deleteReview
  } = useReviews();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // Safely get data with defaults
  const reviews = getProductReviews ? getProductReviews(productId) : [];
  const averageRating = getAverageRating ? getAverageRating(productId) : 0;
  const ratingCounts = getRatingCounts ? getRatingCounts(productId) : { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const userHasReviewed = hasUserReviewed ? hasUserReviewed(productId) : false;

  const totalReviews = reviews?.length || 0;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (userHasReviewed) {
      alert('You have already reviewed this product!');
      return;
    }

    if (addReview) {
      addReview(productId, rating, comment);
      setShowReviewForm(false);
      setComment('');
      setRating(5);
    }
  };

  const handleMarkHelpful = (reviewId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (markHelpful) {
      markHelpful(productId, reviewId);
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Delete this review?')) {
      if (deleteReview) {
        deleteReview(productId, reviewId);
      }
    }
  };

  // Calculate rating percentages
  const getPercentage = (count) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  return (
    <div className="product-reviews">
      <h2>Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="average-rating">
          <span className="big-rating">{averageRating || 0}</span>
          <span className="out-of">/5</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`star ${star <= Math.round(averageRating || 0) ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
          <p className="total-reviews">Based on {totalReviews} reviews</p>
        </div>

        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-bar-item">
              <span className="star-label">{star} ★</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getPercentage(ratingCounts?.[star] || 0)}%` }}
                ></div>
              </div>
              <span className="rating-count">{ratingCounts?.[star] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      {!userHasReviewed && (
        <div className="write-review">
          <button 
            className="write-review-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <h3>Write your review</h3>
          
          <div className="rating-input">
            <label>Your Rating *</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Your Review *</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows="4"
              required
            />
          </div>

          <button type="submit" className="submit-review-btn">
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {!reviews || reviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review?.id || Math.random()} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review?.userName || 'Anonymous'}</span>
                  <span className="review-date">
                    {review?.date ? new Date(review.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>
                <div className="review-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`star ${star <= (review?.rating || 0) ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p className="review-comment">{review?.comment || 'No comment'}</p>

              <div className="review-footer">
                <button 
                  className="helpful-btn"
                  onClick={() => handleMarkHelpful(review?.id)}
                >
                  👍 Helpful ({review?.helpful || 0})
                </button>

                {(user?.email === review?.userId || user?.isAdmin) && (
                  <button 
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(review?.id)}
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;