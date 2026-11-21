import React from 'react';
import PropTypes from 'prop-types';
import { BsExclamationTriangleFill, BsArrowClockwise } from 'react-icons/bs';

const ErrorMessage = ({
  message = "We couldn't load the requested data. Please check your connection and try again.",
  onRetry,
}) => {
  return (
    <div
      className="alert alert-danger d-flex flex-column flex-sm-row align-items-center justify-content-between p-4 my-4 shadow-sm rounded-3"
      role="alert"
    >
      <div className="d-flex align-items-center mb-3 mb-sm-0">
        <BsExclamationTriangleFill className="fs-2 text-danger me-3 flex-shrink-0" />
        <div>
          <h5 className="alert-heading mb-1 fw-bold">Oops! Something went wrong</h5>
          <p className="mb-0 text-secondary">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          className="btn btn-outline-danger d-inline-flex align-items-center gap-2 px-3 py-2 fw-semibold"
          onClick={onRetry}
        >
          <BsArrowClockwise className="fs-5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
