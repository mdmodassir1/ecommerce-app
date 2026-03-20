import React from 'react';
import { useCart } from '../context/CartContext';
import { formatRupees } from '../utils/currency';
import { FiTrash2 } from 'react-icons/fi';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const price = item.discountedPriceInRupees || item.priceInRupees || (item.price * 83);
  const totalPrice = price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.thumbnail} alt={item.title} />
      </div>

      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-brand">{item.brand}</p>
        
        <div className="cart-item-price">
          {item.discountPercentage > 0 ? (
            <>
              <span className="cart-item-original">{formatRupees(item.priceInRupees || item.price * 83)}</span>
              <span className="cart-item-discounted">{formatRupees(price)} each</span>
            </>
          ) : (
            <span className="cart-item-current">{formatRupees(price)} each</span>
          )}
        </div>

        <div className="cart-item-actions">
          <div className="cart-item-quantity">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>

          <button 
            className="remove-item"
            onClick={() => removeFromCart(item.id)}
          >
            <FiTrash2 /> Remove
          </button>
        </div>

        <div className="cart-item-total">
          <strong>Total: {formatRupees(totalPrice)}</strong>
        </div>
      </div>
    </div>
  );
};

export default CartItem;