import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../context/ReviewContext';
import { convertToRupees, formatRupees } from '../utils/currency';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getAverageRating } = useReviews();
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!product || !product._id) return null;

  const productId = product._id;
  
  // SAFE: Ensure rating is a number
  let avgRating = getAverageRating(productId);
  if (typeof avgRating === 'string') {
    avgRating = parseFloat(avgRating);
  }
  if (isNaN(avgRating)) {
    avgRating = 0;
  }
  
  const priceInRupees = convertToRupees(product.price);
  const discountedPriceInRupees = product.discountPercentage > 0
    ? convertToRupees(product.price * (1 - product.discountPercentage / 100))
    : priceInRupees;
  const inWishlist = isInWishlist(productId);

  const handleCardClick = () => navigate(`/product/${productId}`);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, _id: productId, priceInRupees, discountedPriceInRupees });
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inWishlist ? removeFromWishlist(productId) : addToWishlist({ ...product, _id: productId, id: productId });
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', product.thumbnail);
    setImageError(true);
    const category = product.category || 'general';
    const fallbacks = {
      beauty: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=400',
      fragrances: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400',
      furniture: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
      groceries: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    e.target.src = fallbacks[category] || fallbacks.beauty;
  };

  const getImageSrc = () => {
    if (imageError) {
      const category = product.category || 'general';
      const fallbacks = {
        beauty: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=400',
        fragrances: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400',
        furniture: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
        groceries: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
      };
      return fallbacks[category] || fallbacks.beauty;
    }
    return product.thumbnail || fallbacks.beauty;
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''} ${product.stock === 0 ? 'out-of-stock' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-badge">
        {product.discountPercentage > 0 && (
          <span className="discount-badge">-{product.discountPercentage}%</span>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <span className="stock-badge">🔥 Only {product.stock} left</span>
        )}
        {product.stock === 0 && (
          <span className="soldout-badge">Sold Out</span>
        )}
      </div>

      <button 
        className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
        onClick={handleWishlistToggle}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <span className="heart">{inWishlist ? '❤️' : '🤍'}</span>
      </button>

      <div className="product-image">
        <img 
          src={getImageSrc()}
          alt={product.title}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="image-overlay"></div>
      </div>

      <div className="product-info">
        <h3 title={product.title}>{product.title}</h3>
        <p className="brand">{product.brand}</p>
        
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < Math.floor(avgRating) ? 'filled' : ''}`}>★</span>
          ))}
          <span className="rating-value">
            {avgRating > 0 ? avgRating.toFixed(1) : 'New'}
          </span>
        </div>

        <div className="price-section">
          {product.discountPercentage > 0 ? (
            <>
              <span className="original-price">{formatRupees(priceInRupees)}</span>
              <span className="discounted-price">{formatRupees(discountedPriceInRupees)}</span>
            </>
          ) : (
            <span className="price">{formatRupees(priceInRupees)}</span>
          )}
        </div>

        <button 
          className={`add-to-cart-btn ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 
            ? 'Out of Stock' 
            : added 
              ? '✓ Added!' 
              : 'Add to Cart'
          }
        </button>
      </div>
    </div>
  );
};

export default ProductCard;