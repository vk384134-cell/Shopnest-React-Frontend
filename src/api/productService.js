import axiosClient from './axiosClient';

/**
 * Service functions for product-related API requests.
 * Centralized service layer - components must never call Axios directly.
 */

export const getProducts = async ({ signal } = {}) => {
  const response = await axiosClient.get('/products', { signal });
  return response.data;
};

export const getProductById = async (id, { signal } = {}) => {
  const response = await axiosClient.get(`/products/${id}`, { signal });
  return response.data;
};

export const getCategories = async ({ signal } = {}) => {
  const response = await axiosClient.get('/products/categories', { signal });
  return response.data;
};

export const getProductsByCategory = async (category, { signal } = {}) => {
  const response = await axiosClient.get(
    `/products/category/${encodeURIComponent(category)}`,
    { signal }
  );
  return response.data;
};

export default {
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
};
