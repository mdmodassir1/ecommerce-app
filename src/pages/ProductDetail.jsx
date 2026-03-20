import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewContext';
import productService from '../services/productService';
import ProductReviews from '../components/ProductReviews';
import { convertToRupees, formatRupees } from '../utils/currency';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getAverageRating } = useReviews();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        if (!id) {
          navigate('/');
          return;
        }
        const foundProduct = await productService.getById(id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const priceInRupees = convertToRupees(product.price);
  const discountedPriceInRupees = product.discountPercentage > 0
    ? convertToRupees(product.price * (1 - product.discountPercentage / 100))
    : priceInRupees;

  const averageRating = getAverageRating(product._id);
  
  const allImages = product.images?.length > 0 
    ? product.images 
    : [product.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image'];

  const handleAddToCart = () => {
    for(let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        _id: product._id,
        priceInRupees,
        discountedPriceInRupees
      });
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={imageError ? 'https://via.placeholder.com/500x500?text=No+Image' : (allImages[selectedImage] || product.thumbnail)} 
              alt={product.title}
              onError={handleImageError}
            />
          </div>
          {allImages.length > 1 && (
            <div className="thumbnail-list">
              {allImages.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} ${index + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="brand">{product.brand}</p>
          
          <div className="rating-section">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < Math.floor(averageRating) ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-value">{averageRating}</span>
          </div>

          <div className="price-section">
            {product.discountPercentage > 0 ? (
              <>
                <span className="original-price">{formatRupees(priceInRupees)}</span>
                <span className="discounted-price">{formatRupees(discountedPriceInRupees)}</span>
                <span className="discount-badge">Save {product.discountPercentage}%</span>
              </>
            ) : (
              <span className="price">{formatRupees(priceInRupees)}</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          <div className="stock-status">
            {product.stock > 0 ? (
              product.stock < 10 ? (
                <span className="low-stock">Only {product.stock} left in stock!</span>
              ) : (
                <span className="in-stock">In Stock</span>
              )
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section - Add this */}
      <div className="reviews-wrapper">
        <ProductReviews productId={product._id} productName={product.title} />
      </div>
    </div>
  );
};

export default ProductDetail;