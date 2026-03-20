import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ onSearch }) => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Change header style on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      if (onSearch) onSearch(searchTerm);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">MyStore</span>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <span>🔍</span>
          </button>
        </form>

        <nav className="nav-menu">
          <Link to="/" className="nav-link">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          
          <Link to="/cart" className="nav-link cart-link">
            <span>🛒</span>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
          
          {user ? (
            <div className="user-menu">
              <button 
                className="user-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{user.name?.split(' ')[0]}</span>
                <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    <span>👤</span> My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setShowDropdown(false)}>
                    <span>📦</span> My Orders
                  </Link>
                  <Link to="/wishlist" onClick={() => setShowDropdown(false)}>
                    <span>❤️</span> Wishlist
                  </Link>
                  {user.isAdmin && (
                    <Link to="/admin" onClick={() => setShowDropdown(false)}>
                      <span>⚙️</span> Admin Panel
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;