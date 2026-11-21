# ShopNest - React E-Commerce Web Application

ShopNest is a modern, responsive e-commerce front-end application built with **React**, **React Router DOM v6**, **Context API**, **Axios**, and **Bootstrap 5**. It consumes products from a RESTful API (defaulting to FakeStore API) and provides a full shopping cart experience.

---

## Features

- **Five Dedicated Pages & 404 Route**:
  - **Home (`/`)**: Engaging hero section, key perks/guarantees, and handpicked featured products (first 4 items).
  - **Products (`/products`)**: Dynamic category filter pills and responsive product grid.
  - **Product Detail (`/products/:id`)**: Comprehensive product view with image fallback, star ratings, category badge, quantity selector, and instant add-to-cart alert.
  - **Shopping Cart (`/cart`)**: Live quantity stepper (`+` / `–`), item removal, clear cart, and automated order summary with subtotal, 8% tax calculation, and order total.
  - **Contact (`/contact`)**: Controlled form with field validation, email validation, inline error messaging, and simulated submission.
  - **Not Found (`*`)**: Accessible 404 page with navigation back to Home or Products.
- **Global Shopping Cart via Context API**:
  - Accessible from any component via the custom `useCart()` hook (no prop drilling).
  - Real-time cart badge in Navbar showing total quantity.
  - Instant localStorage persistence with safe hydration on reload.
  - Memoized calculations (`totalItems`, `subtotal`, `tax`, `total`) and memoized callbacks.
- **Centralized API & Service Layer**:
  - Axios instance configured in `src/api/axiosClient.js` with timeout and dynamic base URL from `VITE_API_BASE_URL`.
  - Service methods centralized in `src/api/productService.js`. Components never call Axios directly.
  - AbortController request cancellation on component unmount.
- **Accessibility & UX**:
  - Semantic HTML, `role="status"` on loading indicators, `aria-label` for screen readers, and clear focus-visible outlines.
  - Missing image fallback handlers (`onError`).
  - Scroll-to-top on route changes.
  - Clean error handling with friendly messages and Retry buttons.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Vite** | Fast build tool and dev server |
| **React 18** | UI framework (functional components & hooks only) |
| **React Router DOM v6** | Client-side routing and navigation |
| **Context API** | Global cart state management |
| **Axios** | HTTP client with centralized interceptor/client |
| **Bootstrap 5 & React-Bootstrap** | Responsive UI styling and components |
| **React Icons** | Clean iconography (Bootstrap icons) |
| **PropTypes** | Runtime type verification on reusable components |

---

## Project Structure

```
src/
├── api/
│   ├── axiosClient.js       # Centralized Axios instance with timeout and base URL
│   └── productService.js    # Service layer for product & category API calls
├── components/
│   ├── CartItem.jsx         # Cart row with +/- stepper, price, and delete action
│   ├── CategoryFilter.jsx   # Pill buttons for category filtering
│   ├── ErrorMessage.jsx     # Accessible alert with user-friendly text and retry action
│   ├── LoadingSpinner.jsx   # Accessible loading spinner (role="status")
│   ├── Navbar.jsx           # Responsive navbar with active links and cart counter badge
│   ├── ProductCard.jsx      # Card with 2-line title, ratings, click navigation, quick add
│   ├── ProductGrid.jsx      # Responsive grid (1-col mobile, 2 tablet, 3-4 desktop)
│   └── ScrollToTop.jsx      # Resets window scroll position on route change
├── context/
│   └── CartContext.jsx      # Global cart state, localStorage persistence, and useCart()
├── hooks/
│   └── useProducts.js       # Custom hook for fetching products with abort support
├── pages/
│   ├── Cart.jsx             # Shopping cart page with order summary card
│   ├── Contact.jsx          # Contact form with validation and simulated submit
│   ├── Home.jsx             # Hero section, value propositions, and featured products
│   ├── NotFound.jsx         # 404 page with navigation links
│   ├── ProductDetail.jsx    # Single product view with quantity selector & add to cart
│   └── Products.jsx         # Catalog page with category filtering and product grid
├── App.jsx                  # Route definitions and site layout
├── index.css                # Minimal custom CSS tweaks & line clamp helpers
└── main.jsx                 # Entry point with Bootstrap CSS, Router, and CartProvider
```

---

## Environment Variables

Configure the API base URL in `.env`:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

Refer to `.env.example` for reference.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at the local URL printed by Vite (typically `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## Assumptions & Design Choices

1. **API Fallback**: The default API is `https://fakestoreapi.com`. If the external API is unreachable or times out, a user-friendly error message is displayed with a "Retry" button.
2. **Category Filtering**: Categories are fetched from `/products/categories` and filtering is performed client-side on the product dataset for instant, smooth filtering without extra network overhead.
3. **Quantity Decrementing**: Decrementing an item with quantity 1 in the cart will remove the item, ensuring seamless cart clean-up.
4. **Checkout Simulation**: The "Proceed to Checkout" button informs the user that checkout is a simulated feature for this front-end demo.
