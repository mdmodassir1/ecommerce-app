import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { formatRupees } from '../utils/currency';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { 
    products = [], 
    orders = [], 
    users = [], 
    loading = false,
    getDashboardStats,
    getRecentOrders,
    getLowStockProducts,
    updateOrderStatus,
    deleteOrder,
    deleteProduct,
    updateUserStatus,
    deleteUser,
    addProduct,
    updateProduct
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  // Safe calculations with default values
  const stats = getDashboardStats ? getDashboardStats() : {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0
  };

  const recentOrders = getRecentOrders ? getRecentOrders(5) : [];
  const lowStockProducts = getLowStockProducts ? getLowStockProducts(10) : [];

  // Safe filtering
  const filteredProducts = Array.isArray(products) ? products.filter(p => 
    p?.title?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    p?.category?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    p?.brand?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  ) : [];

  const filteredOrders = Array.isArray(orders) ? orders.filter(o => 
    o?._id?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    o?.user?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  ) : [];

  const filteredUsers = Array.isArray(users) ? users.filter(u => 
    u?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    u?.email?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  ) : [];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage your store efficiently</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Products ({products?.length || 0})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          🛒 Orders ({orders?.length || 0})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users ({users?.length || 0})
        </button>
      </div>

      <div className="admin-search">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="dashboard-tab">
          <div className="stats-grid">
            <div className="stat-card revenue">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-value">{formatRupees(stats.totalRevenue || 0)}</p>
              </div>
            </div>
            <div className="stat-card orders">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>Total Orders</h3>
                <p className="stat-value">{stats.totalOrders || 0}</p>
              </div>
            </div>
            <div className="stat-card products">
              <div className="stat-icon">🛍️</div>
              <div className="stat-content">
                <h3>Products</h3>
                <p className="stat-value">{stats.totalProducts || 0}</p>
              </div>
            </div>
            <div className="stat-card users">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Users</h3>
                <p className="stat-value">{stats.totalUsers || 0}</p>
              </div>
            </div>
          </div>

          <div className="stats-breakdown">
            <div className="breakdown-card">
              <h3>Order Status</h3>
              <div className="status-items">
                <div className="status-item">
                  <span className="status-label pending">Processing</span>
                  <span className="status-count">{stats.pendingOrders || 0}</span>
                </div>
                <div className="status-item">
                  <span className="status-label shipped">Shipped</span>
                  <span className="status-count">{stats.shippedOrders || 0}</span>
                </div>
                <div className="status-item">
                  <span className="status-label delivered">Delivered</span>
                  <span className="status-count">{stats.deliveredOrders || 0}</span>
                </div>
              </div>
            </div>

            <div className="breakdown-card">
              <h3>Low Stock Alert</h3>
              {lowStockProducts?.length > 0 ? (
                <div className="low-stock-list">
                  {lowStockProducts.slice(0, 5).map(p => (
                    <div key={p?._id} className="low-stock-item">
                      <span className="product-name">{p?.title || 'Product'}</span>
                      <span className="stock-count">Stock: {p?.stock || 0}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">All products have sufficient stock</p>
              )}
            </div>
          </div>

          <div className="recent-orders">
            <h3>Recent Orders</h3>
            <table className="recent-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders?.map(order => (
                  <tr key={order?._id}>
                    <td>{order?._id || 'N/A'}</td>
                    <td>{order?.user?.name || 'N/A'}</td>
                    <td>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td>{formatRupees(order?.totalPrice || 0)}</td>
                    <td>
                      <span className={`status-badge ${order?.status || ''}`}>
                        {order?.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="products-tab">
          <div className="tab-header">
            <h2>Manage Products</h2>
            <button 
              className="add-btn"
              onClick={() => setShowAddProduct(true)}
            >
              + Add New Product
            </button>
          </div>

          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts?.map(product => (
                  <tr key={product?._id}>
                    <td>#{product?._id?.slice(-4) || 'N/A'}</td>
                    <td>
                      <img 
                        src={product?.thumbnail || 'https://via.placeholder.com/50'} 
                        alt={product?.title}
                        className="product-thumb"
                      />
                    </td>
                    <td>{product?.title || 'N/A'}</td>
                    <td>{product?.category || 'N/A'}</td>
                    <td>{formatRupees(product?.priceInRupees || 0)}</td>
                    <td>
                      <span className={`stock-badge ${(product?.stock || 0) < 10 ? 'low' : 'good'}`}>
                        {product?.stock || 0}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${(product?.stock || 0) > 0 ? 'active' : 'inactive'}`}>
                        {(product?.stock || 0) > 0 ? 'Active' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={() => setEditingProduct(product)}
                      >
                        ✎
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => {
                          if (window.confirm('Delete this product?')) {
                            deleteProduct?.(product?._id);
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="orders-tab">
          <h2>Manage Orders</h2>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map(order => (
                  <tr key={order?._id}>
                    <td>{order?._id || 'N/A'}</td>
                    <td>{order?.user?.name || 'N/A'}</td>
                    <td>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td>{order?.items?.length || 0}</td>
                    <td>{formatRupees(order?.totalPrice || 0)}</td>
                    <td>
                      <select 
                        value={order?.status || 'processing'}
                        onChange={(e) => updateOrderStatus?.(order?._id, e.target.value)}
                        className={`status-select ${order?.status || ''}`}
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => {
                          if (window.confirm('Delete this order?')) {
                            deleteOrder?.(order?._id);
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="users-tab">
          <h2>Manage Users</h2>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map(user => (
                  <tr key={user?._id}>
                    <td>#{user?._id?.slice(-4) || 'N/A'}</td>
                    <td>{user?.name || 'N/A'}</td>
                    <td>{user?.email || 'N/A'}</td>
                    <td>{user?.totalOrders || 0}</td>
                    <td>
                      <select 
                        value={user?.status || 'active'}
                        onChange={(e) => updateUserStatus?.(user?._id, e.target.value)}
                        className={`status-select ${user?.status || ''}`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => {
                          if (window.confirm('Delete this user?')) {
                            deleteUser?.(user?._id);
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddProduct || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
          onSave={(productData) => {
            if (editingProduct) {
              updateProduct?.(editingProduct._id, productData);
            } else {
              addProduct?.(productData);
            }
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(product || {
    title: '',
    description: '',
    category: 'beauty',
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: '',
    thumbnail: 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=400&h=400&fit=crop',
    images: []
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Prepare images array
    const productToSave = {
      ...formData,
      images: formData.thumbnail ? [formData.thumbnail] : [],
      price: parseFloat(formData.price),
      discountPercentage: parseFloat(formData.discountPercentage || 0),
      stock: parseInt(formData.stock)
    };
    
    await onSave(productToSave);
    setSaving(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Essence Mascara Lash Princess"
              />
            </div>
            <div className="form-group">
              <label>Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                placeholder="e.g., Essence"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              placeholder="Product description..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (USD) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                placeholder="9.99"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Discount %</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="10"
              />
            </div>
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                placeholder="100"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              required
              placeholder="https://images.unsplash.com/photo-..."
            />
            <small className="help-text">Use Unsplash or any image URL</small>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : (product ? 'Update' : 'Add') + ' Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;