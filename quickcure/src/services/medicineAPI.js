// src/services/medicineAPI.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const medicineAPI = {
  // Get all medicines (public)
  getAllMedicines: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`/pharmacies/medicines/all${queryString ? `?${queryString}` : ''}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get medicine by ID
  getMedicineById: async (medicineId, pharmacyId) => {
    try {
      const response = await api.get(`/pharmacies/${pharmacyId}/medicines/${medicineId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await api.get('/pharmacies/medicines/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get medicine stats
  getStats: async () => {
    try {
      const response = await api.get('/pharmacies/medicines/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;