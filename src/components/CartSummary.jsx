import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatRupees } from '../utils/currency';
import './CartSummary.css';

const CartSummary = () => {
  const { cartTotal, cart } = useCart();
  
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = cartTotal > 5000 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-row">
        <span>Subtotal ({itemCount} items)</span>
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
      
      <Link to="/checkout" className="checkout-btn">
        Proceed to Checkout 🇮🇳
      </Link>
      
      <Link to="/" className="continue-link">
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;