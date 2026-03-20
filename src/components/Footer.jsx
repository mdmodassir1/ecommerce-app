import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About MyStore</h3>
          <p>Your one-stop shop for amazing products at great prices. We bring the best shopping experience to India.</p>
          <div className="social-links">
            <a href="#"><span>📷</span></a>
            <a href="https://www.linkedin.com/in/md-modassir-9316702bb/"><span> In </span></a>
            <a href="https://www.instagram.com/itz_modo/?__pwa=1"><span>📱</span></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/orders">Orders</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Refunds</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p><span>📍</span> xyz </p>
          <p><span>📞</span> +91 XXX XXXX XXX</p>
          <p><span>✉️</span> support@mystore.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 MyStore. All rights reserved. Made by Md Modassir </p>
      </div>
    </footer>
  );
};

export default Footer;