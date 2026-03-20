import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatRupees } from '../utils/currency';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  const shipping = cartTotal > 5000 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => {
            const itemId = item._id || item.id;
            const price = item.discountedPriceInRupees || item.priceInRupees || (item.price * 83);
            
            return (
              <div key={itemId} className="cart-item">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  onClick={() => navigate(`/product/${itemId}`)}
                />
                
                <div className="cart-item-details">
                  <h3 onClick={() => navigate(`/product/${itemId}`)}>
                    {item.title}
                  </h3>
                  <p className="item-brand">{item.brand}</p>
                  
                  <div className="item-price">
                    {item.discountPercentage > 0 ? (
                      <>
                        <span className="original">{formatRupees(item.priceInRupees || item.price * 83)}</span>
                        <span className="discounted">{formatRupees(price)}</span>
                      </>
                    ) : (
                      <span className="current">{formatRupees(price)}</span>
                    )}
                  </div>

                  <div className="item-actions">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(itemId)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="item-total">
                    Subtotal: {formatRupees(price * item.quantity)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span>{formatRupees(cartTotal)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatRupees(shipping)}</span>
          </div>
          
          <div className="summary-row">
            <span>GST (5%)</span>
            <span>{formatRupees(tax)}</span>
          </div>
          
          {cartTotal < 5000 && (
            <div className="shipping-note">
              Add {formatRupees(5000 - cartTotal)} more for free shipping!
            </div>
          )}
          
          <div className="summary-total">
            <span>Total</span>
            <span>{formatRupees(grandTotal)}</span>
          </div>

          <button 
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;