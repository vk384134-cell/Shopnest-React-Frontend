import React from 'react';
import { Link } from 'react-router-dom';
import { BsCompass, BsArrowLeft, BsHouseDoor } from 'react-icons/bs';

const NotFound = () => {
  return (
    <div className="py-5 my-5">
      <div className="container">
        <div className="text-center py-5 bg-light rounded-4 shadow-sm p-4 p-md-5 col-lg-8 mx-auto">
          <BsCompass className="display-1 text-primary mb-3" />
          <h1 className="display-3 fw-black text-dark mb-2">404</h1>
          <h3 className="fw-bold text-dark mb-3">Page Not Found</h3>
          <p className="lead text-secondary fs-6 mb-4 col-md-10 mx-auto">
            Sorry, the page you are looking for doesn't exist, has been moved, or is temporarily
            unavailable.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-pill px-4 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
            >
              <BsHouseDoor />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/products"
              className="btn btn-outline-secondary btn-lg rounded-pill px-4 fw-semibold d-inline-flex align-items-center gap-2"
            >
              <BsArrowLeft />
              <span>Browse Products</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
