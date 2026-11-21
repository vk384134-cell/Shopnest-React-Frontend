import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { BsBoxSeam } from 'react-icons/bs';

const ProductGrid = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5 my-4 bg-light rounded-4 p-5 shadow-sm">
        <BsBoxSeam className="display-3 text-secondary mb-3" />
        <h4 className="fw-bold text-dark">No Products Found</h4>
        <p className="text-muted mb-0">
          We couldn't find any products matching your current selection.
        </p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default ProductGrid;
