import React from 'react';
import PropTypes from 'prop-types';

const CategoryFilter = ({
  categories = [],
  selectedCategory = 'all',
  onSelect,
}) => {
  const allCategories = ['all', ...categories];

  return (
    <div
      className="d-flex flex-wrap gap-2 mb-4 align-items-center"
      role="group"
      aria-label="Filter products by category"
    >
      <span className="fw-semibold text-secondary me-1">Categories:</span>
      {allCategories.map((cat) => {
        const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            type="button"
            className={`btn btn-sm rounded-pill text-capitalize px-3 py-1 fw-medium transition-all ${isActive
              ? 'btn-primary shadow-sm'
              : 'btn-outline-secondary'
              }`}
            onClick={() => onSelect(cat)}
            aria-pressed={isActive}
          >
            {cat === 'all' ? 'All Products' : cat}
          </button>
        );
      })}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedCategory: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;
