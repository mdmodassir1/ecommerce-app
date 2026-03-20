// src/utils/currency.js

// Conversion rate: 1 USD = 83 INR
const USD_TO_INR = 83;

export const convertToRupees = (usdPrice) => {
  if (!usdPrice) return 0;
  return Math.round(parseFloat(usdPrice) * USD_TO_INR);
};

export const formatRupees = (amount) => {
  if (!amount) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
};

// Also export as default
const currencyUtils = {
  convertToRupees,
  formatRupees
};

export default currencyUtils;