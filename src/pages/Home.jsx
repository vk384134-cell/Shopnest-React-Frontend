import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { BsArrowRight, BsShieldCheck, BsTruck, BsHeadset, BsArrowRepeat } from 'react-icons/bs';

const Home = () => {
  const { products, loading, error, refetch } = useProducts();

  // First 4 products as featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5 py-lg-6 hero-section position-relative overflow-hidden">
        <div className="container py-4">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                New Season Arrivals
              </span>
              <h1 className="display-4 fw-black text-white mb-3 tracking-tight">
                Discover Quality Essentials for Every Day
              </h1>
              <p className="lead text-light opacity-75 mb-4 pe-lg-5">
                Explore curated clothing, jewelry, electronics, and daily essentials backed by
                verified reviews and seamless nationwide delivery.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-pill d-inline-flex align-items-center gap-2 shadow"
                >
                  <span>Shop Catalog</span>
                  <BsArrowRight />
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold rounded-pill"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="col-lg-5 text-center d-none d-lg-block">
              <div className="hero-badge-card p-4 rounded-4 bg-secondary bg-opacity-25 border border-secondary border-opacity-50 text-start shadow-lg">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-warning text-dark p-3 rounded-circle">
                    <BsTruck className="fs-3" />
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold">Fast & Free Shipping</h5>
                    <small className="text-light opacity-75">On all eligible domestic orders</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-warning text-dark p-3 rounded-circle">
                    <BsShieldCheck className="fs-3" />
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold">100% Secure Checkout</h5>
                    <small className="text-light opacity-75">Encrypted payment transactions</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-warning text-dark p-3 rounded-circle">
                    <BsArrowRepeat className="fs-3" />
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold">Hassle-Free Returns</h5>
                    <small className="text-light opacity-75">30-day money-back guarantee</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Row */}
      <section className="py-4 bg-light border-bottom">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center">
                <BsTruck className="fs-2 text-primary mb-2" />
                <h6 className="fw-bold mb-1">Fast Delivery</h6>
                <small className="text-muted">Swift door-step drop-off</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center">
                <BsShieldCheck className="fs-2 text-primary mb-2" />
                <h6 className="fw-bold mb-1">Secure Payments</h6>
                <small className="text-muted">Safe & encrypted payments</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center">
                <BsArrowRepeat className="fs-2 text-primary mb-2" />
                <h6 className="fw-bold mb-1">30-Day Returns</h6>
                <small className="text-muted">Easy return policy</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center">
                <BsHeadset className="fs-2 text-primary mb-2" />
                <h6 className="fw-bold mb-1">24/7 Support</h6>
                <small className="text-muted">Always here to help</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-primary text-uppercase fw-bold small">Our Handpicked Selection</span>
              <h2 className="fw-bold text-dark mb-1">Featured Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline-primary rounded-pill mt-3 mt-md-0 fw-semibold">
              Explore All Products &rarr;
            </Link>
          </div>

          {loading && <LoadingSpinner message="Loading featured products..." />}

          {error && <ErrorMessage message={error} onRetry={refetch} />}

          {!loading && !error && (
            <>
              <ProductGrid products={featuredProducts} />
              <div className="text-center mt-5">
                <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                  View Full Catalog
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
