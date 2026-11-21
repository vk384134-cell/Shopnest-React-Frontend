import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import useProducts from '../hooks/useProducts';
import { getCategories } from '../api/productService';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Products = () => {
  const { products, loading: productsLoading, error: productsError, refetch } = useProducts();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // Fetch categories
  const fetchCategories = useCallback(async (signal) => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const data = await getCategories({ signal });
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        return;
      }
      setCategoriesError("Couldn't load categories.");
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchCategories(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchCategories]);

  // Client-side filtering by category
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory.toLowerCase() === 'all') {
      return products;
    }
    return products.filter(
      (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  return (
    <div className="py-5">
      <div className="container">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="fw-bold text-dark mb-2">Our Products</h1>
          <p className="text-secondary mb-0">
            Browse our wide selection of items. Filter by category to find exactly what you need.
          </p>
        </div>

        {/* Category Filters */}
        {!categoriesError && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={(cat) => setSelectedCategory(cat)}
          />
        )}

        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner message="Fetching products and categories..." />}

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={productsError || categoriesError}
            onRetry={() => {
              refetch();
              const controller = new AbortController();
              fetchCategories(controller.signal);
            }}
          />
        )}

        {/* Product Grid */}
        {!isLoading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
              <span>
                Showing <strong>{filteredProducts.length}</strong> of{' '}
                <strong>{products.length}</strong> products
              </span>
              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  className="btn btn-link btn-sm text-decoration-none p-0 text-primary"
                  onClick={() => setSelectedCategory('all')}
                >
                  Clear filter
                </button>
              )}
            </div>
            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
