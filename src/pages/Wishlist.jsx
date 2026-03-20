import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatRupees, convertToRupees } from '../utils/currency';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const priceInRupees = convertToRupees(product.price);
    const discountedPriceInRupees = product.discountPercentage > 0
      ? convertToRupees(product.price * (1 - product.discountPercentage / 100))
      : priceInRupees;
      
    addToCart({
      ...product,
      priceInRupees,
      discountedPriceInRupees
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="empty-icon">❤️</div>
        <h2>Your wishlist is empty</h2>
        <p>Save your favorite items here and shop them later!</p>
        <Link to="/" className="shop-now-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>My Wishlist</h1>
          <p className="wishlist-count">{wishlist.length} items saved</p>
        </div>
        <button onClick={clearWishlist} className="clear-wishlist-btn">
          Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {wishlist.map(product => {
          const productId = product._id || product.id;
          const priceInRupees = convertToRupees(product.price);
          const discountedPrice = product.discountPercentage > 0
            ? convertToRupees(product.price * (1 - product.discountPercentage / 100))
            : priceInRupees;

          return (
            <div key={productId} className="wishlist-card">
              <button 
                className="remove-btn"
                onClick={() => removeFromWishlist(productId)}
                title="Remove from wishlist"
              >
                ✕
              </button>
              
              <div 
                className="wishlist-card-image"
                onClick={() => navigate(`/product/${productId}`)}
              >
                <img src={product.thumbnail} alt={product.title} />
                {product.discountPercentage > 0 && (
                  <span className="discount-badge">-{product.discountPercentage}%</span>
                )}
              </div>

              <div className="wishlist-card-content">
                <h3 onClick={() => navigate(`/product/${productId}`)}>
                  {product.title}
                </h3>
                <p className="brand">{product.brand}</p>
                
                <div className="price-section">
                  {product.discountPercentage > 0 ? (
                    <>
                      <span className="original-price">{formatRupees(priceInRupees)}</span>
                      <span className="discounted-price">{formatRupees(discountedPrice)}</span>
                    </>
                  ) : (
                    <span className="price">{formatRupees(priceInRupees)}</span>
                  )}
                </div>

                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;