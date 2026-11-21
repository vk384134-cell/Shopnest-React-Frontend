import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import {
  BsCartX,
  BsBagCheck,
  BsTrash3,
  BsArrowRight,
  BsShieldLock,
} from 'react-icons/bs';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Cart = () => {
  const { cartItems, clearCart, subtotal, tax, total, TAX_RATE, totalItems } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="py-5">
        <div className="container">
          <div className="text-center py-5 my-5 bg-light rounded-4 shadow-sm p-4 p-md-5">
            <BsCartX className="display-1 text-muted mb-4" />
            <h2 className="fw-bold text-dark mb-2">Your Cart is Empty</h2>
            <p className="text-secondary lead fs-6 mb-4 col-md-6 mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our wide range of
              products and discover great deals!
            </p>
            <Link
              to="/products"
              className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
            >
              <span>Continue Shopping</span>
              <BsArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4">
          <div>
            <h1 className="fw-bold text-dark mb-1">Shopping Cart</h1>
            <p className="text-secondary mb-0">
              You have <strong>{totalItems}</strong> item{totalItems === 1 ? '' : 's'} in your cart
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 mt-3 mt-sm-0 align-self-start align-self-sm-auto"
            onClick={clearCart}
          >
            <BsTrash3 />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="mt-3">
              <Link to="/products" className="btn btn-link text-decoration-none text-primary ps-0 fw-semibold">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '90px' }}>
              <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal</span>
                <span className="fw-semibold text-dark">{currencyFormatter.format(subtotal)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">
                  Estimated Tax ({(TAX_RATE * 100).toFixed(0)}%)
                </span>
                <span className="fw-semibold text-dark">{currencyFormatter.format(tax)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Shipping</span>
                <span className="badge bg-success-subtle text-success fw-bold">FREE</span>
              </div>

              <hr className="my-3" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 fw-bold text-dark">Total</span>
                <span className="fs-4 fw-black text-primary">{currencyFormatter.format(total)}</span>
              </div>

              {checkoutMessage && (
                <div className="alert alert-info py-2 small mb-3 text-center" role="alert">
                  Checkout is a placeholder for this demo front-end.
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary btn-lg w-100 rounded-pill fw-bold d-inline-flex align-items-center justify-content-center gap-2 shadow-sm mb-3"
                onClick={() => setCheckoutMessage(true)}
              >
                <BsBagCheck className="fs-5" />
                <span>Proceed to Checkout</span>
              </button>

              <div className="d-flex align-items-center justify-content-center gap-2 text-muted small">
                <BsShieldLock />
                <span>Safe & Secure 256-bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
