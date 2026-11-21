import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BsCart3, BsBagHeartFill } from 'react-icons/bs';

const Navbar = () => {
  const { totalItems } = useCart();
  const [navExpanded, setNavExpanded] = useState(false);

  const toggleNav = () => setNavExpanded(!navExpanded);
  const closeNav = () => setNavExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-white"
          to="/"
          onClick={closeNav}
        >
          <BsBagHeartFill className="text-warning fs-3" />
          <span>Shop<span className="text-warning">Nest</span></span>
        </Link>

        {/* Mobile Cart & Toggle Button */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <Link
            to="/cart"
            className="btn btn-outline-light position-relative p-2 rounded-circle"
            aria-label={`Shopping cart with ${totalItems} items`}
            onClick={closeNav}
          >
            <BsCart3 className="fs-5" />
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={navExpanded}
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${navExpanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-3 fw-medium ${isActive ? 'active text-warning fw-bold' : 'text-light'}`
                }
                onClick={closeNav}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link px-3 fw-medium ${isActive ? 'active text-warning fw-bold' : 'text-light'}`
                }
                onClick={closeNav}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link px-3 fw-medium ${isActive ? 'active text-warning fw-bold' : 'text-light'}`
                }
                onClick={closeNav}
              >
                Contact
              </NavLink>
            </li>
            {/* Desktop Cart Button */}
            <li className="nav-item d-none d-lg-block ms-lg-2">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `btn ${
                    isActive ? 'btn-warning text-dark' : 'btn-outline-light'
                  } position-relative d-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-semibold`
                }
                aria-label={`Shopping cart with ${totalItems} items`}
                onClick={closeNav}
              >
                <BsCart3 className="fs-5" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1">
                    {totalItems}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
