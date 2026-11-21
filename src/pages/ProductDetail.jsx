import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { getProductById } from '../api/productService';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  BsArrowLeft,
  BsStarFill,
  BsCartPlus,
  BsCart3,
  BsCheckCircleFill,
  BsPlus,
  BsDash,
} from 'react-icons/bs';

const FALLBACK_IMAGE = 'https://placehold.co/600x600/f8f9fa/6c757d?text=Product+Image';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const fetchProduct = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(id, { signal });
      if (!data || !data.id) {
        setError('Product not found. It may have been removed or does not exist.');
        setProduct(null);
      } else {
        setProduct(data);
        setImgSrc(data.image || FALLBACK_IMAGE);
      }
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        return;
      }
      setError("We couldn't load product details. Please check your connection and try again.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchProduct]);

  const handleQuantityChange = (newQty) => {
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 4000);
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/products"
            className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2"
          >
            <BsArrowLeft />
            <span>&larr; Back to Products</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner message="Loading product details..." />}

        {/* Error / Not Found State */}
        {error && (
          <div className="my-4">
            <ErrorMessage message={error} onRetry={() => fetchProduct(new AbortController().signal)} />
            <div className="text-center mt-3">
              <Link to="/products" className="btn btn-primary rounded-pill px-4">
                Browse Other Products
              </Link>
            </div>
          </div>
        )}

        {/* Product Details Display */}
        {!loading && !error && product && (
          <div>
            {/* Added to cart Toast / Alert feedback */}
            {feedback && (
              <div
                className="alert alert-success alert-dismissible fade show d-flex align-items-center justify-content-between p-3 mb-4 shadow-sm rounded-3"
                role="alert"
              >
                <div className="d-flex align-items-center gap-2">
                  <BsCheckCircleFill className="text-success fs-5 flex-shrink-0" />
                  <span>
                    <strong>{quantity} &times; {product.title}</strong> added to your cart!
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Link to="/cart" className="btn btn-sm btn-success fw-bold d-inline-flex align-items-center gap-1">
                    <BsCart3 />
                    <span>View Cart</span>
                  </Link>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setFeedback(false)}
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            )}

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Product Image */}
                <div className="col-lg-6 p-4 p-md-5 bg-white d-flex align-items-center justify-content-center border-end">
                  <img
                    src={imgSrc}
                    alt={product.title}
                    loading="lazy"
                    className="img-fluid object-fit-contain product-detail-img"
                    style={{ maxHeight: '420px', width: 'auto' }}
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                  />
                </div>

                {/* Product Info */}
                <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
                  <div>
                    {product.category && (
                      <span className="badge bg-light text-primary text-uppercase px-3 py-2 rounded-pill fw-semibold mb-3">
                        {product.category}
                      </span>
                    )}

                    <h1 className="h2 fw-bold text-dark mb-3">{product.title}</h1>

                    {/* Rating */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div className="d-flex text-warning">
                        {[...Array(5)].map((_, i) => (
                          <BsStarFill
                            key={i}
                            className={i < Math.round(product.rating?.rate || 0) ? 'text-warning' : 'text-muted'}
                          />
                        ))}
                      </div>
                      <span className="fw-bold text-dark">
                        {(product.rating?.rate || 0).toFixed(1)}
                      </span>
                      <span className="text-muted">
                        ({product.rating?.count || 0} customer reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="fs-2 fw-black text-primary mb-4">
                      {currencyFormatter.format(product.price)}
                    </div>

                    {/* Description */}
                    <h6 className="fw-bold text-dark mb-2">Description</h6>
                    <p className="text-secondary lead fs-6 lh-base mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Actions: Quantity Selector & Add to Cart */}
                  <div className="pt-3 border-top">
                    <div className="row g-3 align-items-center">
                      <div className="col-sm-5">
                        <label htmlFor="product-qty-input" className="form-label small fw-semibold text-muted mb-1">
                          Quantity
                        </label>
                        <div className="input-group">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <BsDash />
                          </button>
                          <input
                            id="product-qty-input"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                            className="form-control text-center fw-bold"
                            aria-label="Quantity"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <BsPlus />
                          </button>
                        </div>
                      </div>

                      <div className="col-sm-7">
                        <label className="form-label d-none d-sm-block small text-transparent mb-1">
                          &nbsp;
                        </label>
                        <button
                          type="button"
                          className="btn btn-primary btn-lg w-100 d-inline-flex align-items-center justify-content-center gap-2 fw-bold shadow-sm rounded-pill"
                          onClick={handleAddToCart}
                        >
                          <BsCartPlus className="fs-5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
