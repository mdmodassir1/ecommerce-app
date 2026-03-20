const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['beauty', 'fragrances', 'furniture', 'groceries', 'electronics', 'fashion']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  priceInRupees: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: 0
  },
  brand: {
    type: String,
    required: [true, 'Brand is required']
  },
  sku: {
    type: String,
    unique: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: [String],
  tags: [String],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);