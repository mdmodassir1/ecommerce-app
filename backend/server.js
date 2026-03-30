const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env vars
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: '🚀 Backend API is running!',
    timestamp: new Date().toISOString()
  });
});

// Test API route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API test route working!' 
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📡 API Test: http://localhost:${PORT}/api/products`);
});