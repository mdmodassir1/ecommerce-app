export const APP_NAME = 'MyStore';

export const CATEGORIES = [
  'beauty',
  'fragrances',
  'furniture',
  'groceries'
];

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' }
];

export const SHIPPING_THRESHOLD = 50;
export const TAX_RATE = 0.08;

export const PAYMENT_METHODS = [
  { value: 'credit', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' }
];

export const STOCK_STATUS = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock'
};