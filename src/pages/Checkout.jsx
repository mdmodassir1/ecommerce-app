import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatRupees } from '../utils/currency';
import './Checkout.css';

//  customers
const indianFirstNames = [
  'Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Diya', 'Advik', 'Kabir', 'Arjun',
  'Reyansh', 'Ayaan', 'Ishaan', 'Rudra', 'Sai', 'Shaurya', 'Yash', 'Aadhya',
  'Aaradhya', 'Anaya', 'Kyra', 'Pari', 'Prisha', 'Sara', 'Siya', 'Ira',
  'Myra', 'Riya', 'Amaira', 'Anvi', 'Fatima', 'Kavya', 'Navya', 'Sania'
];

const indianLastNames = [
  'Sharma', 'Verma', 'Gupta', 'Kumar', 'Singh', 'Patel', 'Reddy', 'Rao',
  'Yadav', 'Jha', 'Thakur', 'Mishra', 'Joshi', 'Chatterjee', 'Mukherjee',
  'Banerjee', 'Nair', 'Menon', 'Iyer', 'Pillai', 'Rajput', 'Chauhan'
];

const indianCities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai',
  'Kolkata', 'Pune', 'Jaipur', 'Lucknow', 'Nagpur', 'Indore', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ludhiana', 'Agra', 'Nashik',
  'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad'
];

const indianStates = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Gujarat', 'Tamil Nadu',
  'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar',
  'Punjab', 'Haryana', 'Andhra Pradesh', 'Odisha', 'Kerala', 'Assam'
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const shipping = cartTotal > 5000 ? 0 : 99; // Free shipping over ₹5000
  const tax = Math.round(cartTotal * 0.05); // 5% GST
  const grandTotal = cartTotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // random name customer
    const randomFirstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
    const randomLastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
    const customerName = `${randomFirstName} ${randomLastName}`;
    
  alert(`🎉 Order placed successfully! 
    
Thank you for shopping at MyStore, ${customerName}!
Your order will be delivered within 3-5 business days.

Order Summary:
Items: ${cart.length}
Total: ${formatRupees(grandTotal)}
Payment: ${formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}

A confirmation SMS has been sent to ${formData.phone || 'your registered number'}`);
    
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const getRandomIndianName = () => {
    const randomFirstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
    const randomLastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>🇮🇳 Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>

      <div className="checkout-container">
        <div className="checkout-form">
          {step === 1 && (
            <form onSubmit={handleSubmitShipping} className="shipping-form">
              <h2>📦 Shipping Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="e.g., Aarav"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g., Sharma"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  placeholder="House/Flat No., Building, Street, Landmark"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g., Mumbai"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="400001"
                    pattern="[0-9]{6}"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="continue-btn">
                Continue to Payment →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitPayment} className="payment-form">
              <h2>💳 Payment Method</h2>

              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">💵</span>
                    <div>
                      <h4>Cash on Delivery</h4>
                      <p>Pay when you receive your order</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">💳</span>
                    <div>
                      <h4>Online Payment</h4>
                      <p>Credit/Debit Card, UPI, NetBanking</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">📱</span>
                    <div>
                      <h4>UPI</h4>
                      <p>Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'online' && (
                <div className="card-details">
                  <h3>Card Details</h3>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="password" placeholder="123" maxLength="3" />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'upi' && (
                <div className="upi-details">
                  <h3>UPI ID</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="yourname@okhdfcbank"
                    />
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button type="submit" className="continue-btn">
                  Continue to Review →
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="review-order">
              <h2>📋 Review Your Order</h2>
              
              <div className="review-section">
                <h3>Shipping Address</h3>
                <div className="address-card">
                  <p><strong>{formData.firstName} {formData.lastName}</strong></p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} - {formData.pincode}</p>
                </div>
              </div>

              <div className="review-section">
                <h3>Payment Method</h3>
                <div className="payment-card">
                  {formData.paymentMethod === 'cod' && (
                    <p>💵 Cash on Delivery</p>
                  )}
                  {formData.paymentMethod === 'online' && (
                    <p>💳 Online Payment (Card)</p>
                  )}
                  {formData.paymentMethod === 'upi' && (
                    <p>📱 UPI Payment</p>
                  )}
                </div>
              </div>

              <div className="review-section">
                <h3>Order Items</h3>
                <div className="order-items">
                  {cart.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.title}</span>
                        <span className="item-qty">x {item.quantity}</span>
                      </div>
                      <span className="item-price">
                        {formatRupees((item.discountedPriceInRupees || item.price * 83) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span>Subtotal:</span>
                  <span>{formatRupees(cartTotal)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'Free' : formatRupees(shipping)}</span>
                </div>
                <div className="breakdown-row">
                  <span>GST (5%):</span>
                  <span>{formatRupees(tax)}</span>
                </div>
                <div className="breakdown-row total">
                  <span>Total:</span>
                  <span>{formatRupees(grandTotal)}</span>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>
                <button 
                  type="button" 
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                >
                  🎉 Place Order
                </button>
              </div>

              <div className="secure-badge">
                🔒 100% Secure Checkout
              </div>
            </div>
          )}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-details">
                  <span className="item-name">{item.title}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  {formatRupees((item.discountedPriceInRupees || item.price * 83) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
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
              🚚 Add {formatRupees(5000 - cartTotal)} more for free shipping!
            </div>
          )}
          
          <div className="summary-total">
            <span>Total</span>
            <span>{formatRupees(grandTotal)}</span>
          </div>

          <div className="payment-badges">
            <img src="https://images.financialexpress.com/2017/03/rupay-logo.jpg" alt="RuPay" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI_Logo.svg/1200px-UPI_Logo.svg.png" alt="UPI" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%281%29.jpg/800px-Paytm_Logo_%281%29.jpg" alt="Paytm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;