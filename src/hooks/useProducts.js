import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getProducts } from '../api/productService';

/**
 * Custom hook to fetch products with loading, error, and cancellation support.
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts({ signal });
      setProducts(data);
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        // Request was aborted on unmount, ignore
        return;
      }
      setError('We couldn\'t load products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
  }, [fetchProducts]);

  return { products, loading, error, refetch };
};

export default useProducts;
