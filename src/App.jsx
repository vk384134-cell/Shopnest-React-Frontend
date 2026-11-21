import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { BsBagHeartFill } from 'react-icons/bs';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-4 border-top border-secondary border-opacity-25 mt-auto">
        <div className="container">
          <div className="row g-4 justify-content-between">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <BsBagHeartFill className="text-warning fs-4" />
                <span className="fw-bold fs-4 text-white">
                  Shop<span className="text-warning">Nest</span>
                </span>
              </div>
              <p className="text-light opacity-75 small pe-lg-4">
                Your premier destination for high-quality electronics, fashionable apparel, and
                timeless accessories delivered straight to your door with care.
              </p>
            </div>

            <div className="col-6 col-lg-2">
              <h6 className="fw-bold text-uppercase text-warning mb-3 small">Quick Links</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
                <li>
                  <Link to="/" className="text-light opacity-75 text-decoration-none">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-light opacity-75 text-decoration-none">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-light opacity-75 text-decoration-none">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-light opacity-75 text-decoration-none">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <h6 className="fw-bold text-uppercase text-warning mb-3 small">Customer Care</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
                <li>
                  <span className="text-light opacity-75">Free Shipping</span>
                </li>
                <li>
                  <span className="text-light opacity-75">30-Day Returns</span>
                </li>
                <li>
                  <span className="text-light opacity-75">Secure Payments</span>
                </li>
                <li>
                  <span className="text-light opacity-75">FAQ & Support</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-3">
              <h6 className="fw-bold text-uppercase text-warning mb-3 small">API Connection</h6>
              <p className="text-light opacity-75 small mb-2">
                Powered by FakeStore API or custom backend configured via <code>.env</code>.
              </p>
              <span className="badge bg-secondary text-light">Status: Connected</span>
            </div>
          </div>

          <hr className="my-4 border-secondary border-opacity-50" />

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-light opacity-75">
            <span>&copy; {new Date().getFullYear()} ShopNest. All rights reserved.</span>
            <span>Built with React, React Router, Context API & Bootstrap 5</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
