import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

// Sample orders data
const sampleOrders = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    status: 'Delivered',
    total: 4599,
    items: [
      { id: 1, name: 'Red Lipstick', quantity: 2, price: 1079 },
      { id: 2, name: 'Eyeshadow Palette', quantity: 1, price: 1659 }
    ],
    shipping: {
      name: 'Rahul Sharma',
      address: '123, Green Park, New Delhi - 110016',
      phone: '9876543210'
    }
  },
  {
    id: 'ORD002',
    date: '2024-03-10',
    status: 'Shipped',
    total: 1299,
    items: [
      { id: 3, name: 'Calvin Klein Perfume', quantity: 1, price: 1299 }
    ],
    shipping: {
      name: 'Rahul Sharma',
      address: '123, Green Park, New Delhi - 110016',
      phone: '9876543210'
    }
  },
  {
    id: 'ORD003',
    date: '2024-03-05',
    status: 'Processing',
    total: 3298,
    items: [
      { id: 4, name: 'Beef Steak', quantity: 2, price: 1078 },
      { id: 5, name: 'Cooking Oil', quantity: 1, price: 414 }
    ],
    shipping: {
      name: 'Rahul Sharma',
      address: '123, Green Park, New Delhi - 110016',
      phone: '9876543210'
    }
  },
  {
    id: 'ORD004',
    date: '2024-02-28',
    status: 'Cancelled',
    total: 899,
    items: [
      { id: 6, name: 'Cat Food', quantity: 1, price: 746 }
    ],
    shipping: {
      name: 'Rahul Sharma',
      address: '123, Green Park, New Delhi - 110016',
      phone: '9876543210'
    }
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load orders from localStorage or use sample data
    const storedOrders = localStorage.getItem(`orders_${user?.email}`);
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else if (user) {
      // For demo, use sample orders
      setOrders(sampleOrders);
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(sampleOrders));
    }
  }, [user]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      ...orderData
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    
    if (user) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedOrders));
    }
    
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getOrderById
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};