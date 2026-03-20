import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import productService from '../services/productService';

const AdminContext = createContext();

// Sample data
const sampleOrders = [
  {
    _id: 'ORD001',
    user: { name: 'Rahul Sharma', email: 'rahul@example.com' },
    totalPrice: 4599,
    status: 'delivered',
    createdAt: '2024-03-15',
    items: [{ name: 'Red Lipstick', quantity: 2 }]
  },
  {
    _id: 'ORD002',
    user: { name: 'Priya Singh', email: 'priya@example.com' },
    totalPrice: 3298,
    status: 'processing',
    createdAt: '2024-03-14',
    items: [{ name: 'Beef Steak', quantity: 1 }]
  }
];

const sampleUsers = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@demo.com',
    isAdmin: true,
    totalOrders: 0,
    status: 'active'
  },
  {
    _id: '2',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    isAdmin: false,
    totalOrders: 3,
    status: 'active'
  }
];

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load data
  useEffect(() => {
    if (user?.isAdmin) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    
    try {
      // Fetch products from backend via productService
      const fetchedProducts = await productService.getAll();
      setProducts(fetchedProducts);
      
      // Load orders and users from localStorage or use sample
      const storedOrders = localStorage.getItem('admin_orders');
      const storedUsers = localStorage.getItem('admin_users');

      setOrders(storedOrders ? JSON.parse(storedOrders) : sampleOrders);
      setUsers(storedUsers ? JSON.parse(storedUsers) : sampleUsers);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh products from backend
  const refreshProducts = async () => {
    try {
      const fetchedProducts = await productService.getAll();
      setProducts(fetchedProducts);
      return fetchedProducts;
    } catch (error) {
      console.error('Error refreshing products:', error);
      return [];
    }
  };

  // Product CRUD
  const addProduct = async (productData) => {
    try {
      // Call backend API to add product
      const response = await productService.createProduct(productData);
      
      if (response && response.data) {
        // Refresh products list
        await refreshProducts();
        return { success: true, data: response.data };
      }
      return { success: false, error: 'Failed to add product' };
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      // Call backend API to update product
      const response = await productService.updateProduct(id, productData);
      
      if (response && response.data) {
        // Refresh products list
        await refreshProducts();
        return { success: true, data: response.data };
      }
      return { success: false, error: 'Failed to update product' };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      // Call backend API to delete product
      const response = await productService.deleteProduct(id);
      
      if (response && response.success) {
        // Refresh products list
        await refreshProducts();
        return { success: true };
      }
      return { success: false, error: 'Failed to delete product' };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error.message };
    }
  };

  // Order management
  const updateOrderStatus = (orderId, status) => {
    const updated = orders.map(o => o._id === orderId ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem('admin_orders', JSON.stringify(updated));
  };

  const deleteOrder = (orderId) => {
    const updated = orders.filter(o => o._id !== orderId);
    setOrders(updated);
    localStorage.setItem('admin_orders', JSON.stringify(updated));
  };

  // User management
  const updateUserStatus = (userId, status) => {
    const updated = users.map(u => u._id === userId ? { ...u, status } : u);
    setUsers(updated);
    localStorage.setItem('admin_users', JSON.stringify(updated));
  };

  const deleteUser = (userId) => {
    const updated = users.filter(u => u._id !== userId);
    setUsers(updated);
    localStorage.setItem('admin_users', JSON.stringify(updated));
  };

  // Stats
  const getDashboardStats = () => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    return {
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.length,
      pendingOrders: orders.filter(o => o.status === 'processing').length,
      shippedOrders: orders.filter(o => o.status === 'shipped').length,
      deliveredOrders: orders.filter(o => o.status === 'delivered').length
    };
  };

  const getRecentOrders = (limit = 5) => {
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
  };

  const getLowStockProducts = (threshold = 10) => {
    return products.filter(p => p.stock < threshold);
  };

  return (
    <AdminContext.Provider value={{
      products,
      orders,
      users,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      deleteOrder,
      updateUserStatus,
      deleteUser,
      getDashboardStats,
      getRecentOrders,
      getLowStockProducts,
      refreshProducts
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};