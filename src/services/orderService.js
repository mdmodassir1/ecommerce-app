import api from './api';

const orderService = {
  // Create order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get my orders
  getMyOrders: async () => {
    try {
      const response = await api.get('/orders/myorders');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }
};

export default orderService;