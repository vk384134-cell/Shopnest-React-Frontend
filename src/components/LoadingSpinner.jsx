import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message = 'Loading...', size = 'border' }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center py-5 my-4"
      role="status"
      aria-live="polite"
    >
      <div
        className={`spinner-${size} text-primary mb-3`}
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="text-secondary fw-medium mb-0">{message}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['border', 'grow']),
};

export default LoadingSpinner;
