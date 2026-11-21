import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import { BsPlus, BsDash, BsTrash3 } from 'react-icons/bs';

const FALLBACK_IMAGE = 'https://placehold.co/100x100/f8f9fa/6c757d?text=Cart+Item';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const CartItem = ({ item }) => {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();
  const [imgSrc, setImgSrc] = useState(item.image || FALLBACK_IMAGE);

  const lineTotal = item.price * item.quantity;

  return (
    <div className="card mb-3 border-0 shadow-sm rounded-3">
      <div className="card-body p-3">
        <div className="row align-items-center g-3">
          {/* Product Thumbnail */}
          <div className="col-3 col-sm-2 text-center">
            <img
              src={imgSrc}
              alt={item.title}
              loading="lazy"
              className="img-fluid rounded object-fit-contain bg-white p-1"
              style={{ maxHeight: '80px', width: 'auto' }}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
            />
          </div>

          {/* Title and Unit Price */}
          <div className="col-9 col-sm-4">
            <h6 className="mb-1 fw-bold text-dark text-truncate-2" title={item.title}>
              {item.title}
            </h6>
            <div className="text-muted small">
              Unit Price: {currencyFormatter.format(item.price)}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="col-6 col-sm-3 d-flex align-items-center justify-content-start justify-content-sm-center">
            <div className="input-group input-group-sm quantity-stepper" style={{ maxWidth: '120px' }}>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => decreaseQty(item.id)}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                <BsDash />
              </button>
              <span className="input-group-text bg-white fw-bold px-3 text-center flex-grow-1 justify-content-center">
                {item.quantity}
              </span>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => increaseQty(item.id)}
                aria-label={`Increase quantity of ${item.title}`}
              >
                <BsPlus />
              </button>
            </div>
          </div>

          {/* Line Total & Remove Action */}
          <div className="col-6 col-sm-3 d-flex align-items-center justify-content-end gap-3">
            <span className="fw-bold fs-6 text-primary">
              {currencyFormatter.format(lineTotal)}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger p-2 rounded-circle"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.title} from cart`}
              title="Remove item"
            >
              <BsTrash3 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
