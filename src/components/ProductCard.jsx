import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BsStarFill, BsCartPlus, BsCheck2 } from 'react-icons/bs';

const FALLBACK_IMAGE = 'https://placehold.co/400x400/f8f9fa/6c757d?text=Product+Image';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(product?.image || FALLBACK_IMAGE);
  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card navigation
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const rate = product?.rating?.rate ?? 0;
  const count = product?.rating?.count ?? 0;

  return (
    <div
      className="card h-100 shadow-sm border-0 product-card cursor-pointer position-relative overflow-hidden"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${product?.title}`}
    >
      <div className="card-img-wrapper p-3 text-center bg-white d-flex align-items-center justify-content-center">
        <img
          src={imgSrc}
          alt={product?.title || 'Product'}
          loading="lazy"
          className="card-img-top object-fit-contain product-img"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
      </div>

      <div className="card-body d-flex flex-column p-3">
        {product?.category && (
          <span className="badge bg-light text-secondary text-uppercase mb-2 align-self-start fw-semibold fs-xs">
            {product.category}
          </span>
        )}

        <h6 className="card-title text-dark fw-bold text-truncate-2 mb-2" title={product?.title}>
          {product?.title}
        </h6>

        <div className="d-flex align-items-center gap-1 mb-2">
          <BsStarFill className="text-warning small" />
          <span className="fw-semibold small text-dark">{rate.toFixed(1)}</span>
          <span className="text-muted small">({count})</span>
        </div>

        <div className="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
          <div className="fs-5 fw-bold text-primary">
            {currencyFormatter.format(product?.price || 0)}
          </div>
          <button
            type="button"
            className={`btn btn-sm ${added ? 'btn-success' : 'btn-outline-primary'} d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill`}
            onClick={handleAddToCart}
            aria-label={`Add ${product?.title} to cart`}
          >
            {added ? (
              <>
                <BsCheck2 />
                <span>Added</span>
              </>
            ) : (
              <>
                <BsCartPlus />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
  }).isRequired,
};

export default ProductCard;
