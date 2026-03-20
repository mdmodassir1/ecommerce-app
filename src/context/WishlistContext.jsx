import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`wishlist_${user.email}`);
      setWishlist(saved ? JSON.parse(saved) : []);
    } else {
      setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (wishlist.length > 0) {
        localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlist));
      } else {
        localStorage.removeItem(`wishlist_${user.email}`);
      }
    }
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    if (!product?._id) return;
    setWishlist(prev => prev.some(item => item._id === product._id) ? prev : [...prev, product]);
  };

  const removeFromWishlist = (productId) => {
    if (!productId) return;
    setWishlist(prev => prev.filter(item => item._id !== productId));
  };

  const isInWishlist = (productId) => wishlist.some(item => item._id === productId);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount: wishlist.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};