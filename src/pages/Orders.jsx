import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatRupees } from '../utils/currency';
import './Orders.css';

// Sample orders data
const sampleOrders = [
  {
    _id: 'ORD001',
    date: '2024-03-15',
    status: 'delivered',
    total: 4599,
    items: [
      { name: 'Red Lipstick', quantity: 2, price: 1078 },
      { name: 'Eyeshadow Palette', quantity: 1, price: 1659 }
    ],
    tracking: {
      carrier: 'Delhivery',
      trackingNumber: 'DLV123456789',
      estimatedDelivery: '2024-03-18',
      timeline: [
        { status: 'Order Placed', date: '2024-03-15', completed: true },
        { status: 'Order Confirmed', date: '2024-03-15', completed: true },
        { status: 'Shipped', date: '2024-03-16', completed: true },
        { status: 'Out for Delivery', date: '2024-03-18', completed: false },
        { status: 'Delivered', date: null, completed: false }
      ]
    }
  },
  {
    _id: 'ORD002',
    date: '2024-03-10',
    status: 'shipped',
    total: 1299,
    items: [
      { name: 'Calvin Klein Perfume', quantity: 1, price: 1299 }
    ],
    tracking: {
      carrier: 'Blue Dart',
      trackingNumber: 'BDT987654321',
      estimatedDelivery: '2024-03-14',
      timeline: [
        { status: 'Order Placed', date: '2024-03-10', completed: true },
        { status: 'Order Confirmed', date: '2024-03-10', completed: true },
        { status: 'Shipped', date: '2024-03-12', completed: true },
        { status: 'Out for Delivery', date: null, completed: false },
        { status: 'Delivered', date: null, completed: false }
      ]
    }
  },
  {
    _id: 'ORD003',
    date: '2024-03-05',
    status: 'processing',
    total: 3298,
    items: [
      { name: 'Beef Steak', quantity: 2, price: 1078 },
      { name: 'Cooking Oil', quantity: 1, price: 414 }
    ],
    tracking: {
      carrier: 'Ekart',
      trackingNumber: 'EKT456789123',
      estimatedDelivery: '2024-03-09',
      timeline: [
        { status: 'Order Placed', date: '2024-03-05', completed: true },
        { status: 'Order Confirmed', date: '2024-03-05', completed: true },
        { status: 'Shipped', date: null, completed: false },
        { status: 'Out for Delivery', date: null, completed: false },
        { status: 'Delivered', date: null, completed: false }
      ]
    }
  }
];

const Orders = () => {
  const [orders] = useState(sampleOrders);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTracking, setShowTracking] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'status-delivered';
      case 'shipped': return 'status-shipped';
      case 'processing': return 'status-processing';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTracking(true);
  };

  const closeTracking = () => {
    setShowTracking(false);
    setSelectedOrder(null);
  };

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <div className="no-orders-icon">📦</div>
        <h2>No orders yet</h2>
        <p>Start shopping to see your orders here!</p>
        <Link to="/" className="shop-now-btn">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      <div className="order-filters">
        {['all', 'processing', 'shipped', 'delivered'].map(type => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order._id}</h3>
                <p className="order-date">
                  {new Date(order.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <span className={`status-badge ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatRupees(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span>Total:</span>
                <strong>{formatRupees(order.total)}</strong>
              </div>
              <button 
                className="track-btn"
                onClick={() => handleTrackOrder(order)}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Modal */}
      {showTracking && selectedOrder && (
        <div className="tracking-modal-overlay" onClick={closeTracking}>
          <div className="tracking-modal" onClick={e => e.stopPropagation()}>
            <div className="tracking-modal-header">
              <h2>Track Order #{selectedOrder._id}</h2>
              <button className="close-btn" onClick={closeTracking}>✕</button>
            </div>

            <div className="tracking-info">
              <div className="tracking-details">
                <div className="detail-item">
                  <span className="detail-label">Carrier:</span>
                  <span className="detail-value">{selectedOrder.tracking?.carrier || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tracking Number:</span>
                  <span className="detail-value">{selectedOrder.tracking?.trackingNumber || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Estimated Delivery:</span>
                  <span className="detail-value">
                    {selectedOrder.tracking?.estimatedDelivery 
                      ? new Date(selectedOrder.tracking.estimatedDelivery).toLocaleDateString('en-IN')
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="tracking-timeline">
                <h3>Tracking Timeline</h3>
                <div className="timeline">
                  {selectedOrder.tracking?.timeline?.map((step, index) => (
                    <div key={index} className={`timeline-item ${step.completed ? 'completed' : ''}`}>
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4>{step.status}</h4>
                        <p>{step.date ? new Date(step.date).toLocaleDateString('en-IN') : 'Pending'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tracking-modal-footer">
              <button className="close-modal-btn" onClick={closeTracking}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;