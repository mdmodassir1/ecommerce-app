const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

// Simple order routes (you can expand later)
router.get('/', protect, admin, (req, res) => {
  res.json({ success: true, message: 'Orders route working' });
});

router.post('/', protect, (req, res) => {
  res.json({ success: true, message: 'Order created' });
});

router.get('/myorders', protect, (req, res) => {
  res.json({ success: true, message: 'My orders' });
});

module.exports = router;