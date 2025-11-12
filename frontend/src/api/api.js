import axios from "axios";
import { API_BASE_URL } from "./config";

// ✅ Products
export const getProducts = async () => {
  const res = await axios.get(`${API_BASE_URL}/products`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/products/${id}`);
  return res.data;
};

// ✅ Promos
export const validatePromo = async (code) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/promos/validate/${code}`);
    return res.data;
  } catch (err) {
    console.error("Promo validation error:", err);
    throw err.response?.data || "Promo validation failed";
  }
};

// ✅ Orders
export const createOrder = async (orderData) => {
  const res = await axios.post(`${API_BASE_URL}/orders`, orderData);
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get(`${API_BASE_URL}/orders`);
  return res.data;
};
