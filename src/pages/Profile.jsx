import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '9876543210',
    address: user?.address || '123, Green Park, New Delhi',
    city: user?.city || 'Delhi',
    state: user?.state || 'Delhi',
    pincode: user?.pincode || '110016',
    dob: user?.dob || '1990-01-01',
    gender: user?.gender || 'male'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // In real app, this would be an API call
    setMessage({ text: 'Profile updated successfully!', type: 'success' });
    setIsEditing(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: 'New passwords do not match!', type: 'error' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters!', type: 'error' });
      return;
    }
    
    // In real app, this would be an API call
    setMessage({ text: 'Password changed successfully!', type: 'success' });
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-container">
        {/* Profile Summary Card */}
        <div className="profile-summary">
          <div className="profile-avatar">
            <span className="avatar-text">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="profile-info">
            <h2>{user?.name || 'User'}</h2>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-join-date">
              Member since {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">Wishlist</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">Reviews</span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="details-header">
            <h3>Personal Information</h3>
            {!isEditing ? (
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✎ Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-btn"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="details-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="info-text">{formData.name}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="info-text">{formData.email}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                ) : (
                  <p className="info-text">{formData.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="info-text">{new Date(formData.dob).toLocaleDateString('en-IN')}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                />
              ) : (
                <p className="info-text">{formData.address}</p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="info-text">{formData.city}</p>
                )}
              </div>

              <div className="form-group">
                <label>State</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="info-text">{formData.state}</p>
                )}
              </div>

              <div className="form-group">
                <label>Pincode</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    maxLength="6"
                  />
                ) : (
                  <p className="info-text">{formData.pincode}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="password-section">
          <div className="password-header">
            <h3>Password & Security</h3>
            <button 
              className="change-password-btn"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordForm && (
            <form className="password-form" onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>

              <div className="password-actions">
                <button type="submit" className="update-password-btn">
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Account Actions */}
        <div className="account-actions">
          <h3>Account Actions</h3>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate('/orders')}>
              <span className="action-icon">📦</span>
              <span className="action-text">My Orders</span>
            </button>
            <button className="action-btn" onClick={() => navigate('/wishlist')}>
              <span className="action-icon">❤️</span>
              <span className="action-text">Wishlist</span>
            </button>
            <button className="action-btn" onClick={() => {}}>
              <span className="action-icon">📍</span>
              <span className="action-text">Saved Addresses</span>
            </button>
            <button className="action-btn" onClick={() => {}}>
              <span className="action-icon">💳</span>
              <span className="action-text">Payment Methods</span>
            </button>
            <button className="action-btn logout-btn" onClick={handleLogout}>
              <span className="action-icon">🚪</span>
              <span className="action-text">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;