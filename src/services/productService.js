import api from './api';

const productService = {
  // Get all products from backend
  getAll: async () => {
    try {
      console.log('Fetching products from backend...');
      const response = await api.get('/products');
      console.log('Backend response:', response.data);
      
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by ID
  getById: async (id) => {
    if (!id) return null;
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await api.get('/products');
      const products = response.data.data;
      if (Array.isArray(products)) {
        return [...new Set(products.map(p => p.category))];
      }
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // ===== ADMIN APIs =====
  
  // Create new product (Admin only)
  createProduct: async (productData) => {
    try {
      console.log('Creating product:', productData);
      const response = await api.post('/products', productData);
      console.log('Create response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product (Admin only)
  updateProduct: async (id, productData) => {
    try {
      console.log('Updating product:', id, productData);
      const response = await api.put(`/products/${id}`, productData);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product (Admin only)
  deleteProduct: async (id) => {
    try {
      console.log('Deleting product:', id);
      const response = await api.delete(`/products/${id}`);
      console.log('Delete response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

export default productService;