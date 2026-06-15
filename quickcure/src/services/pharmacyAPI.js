// ---------------------------------new development code---------------------------------
// src/services/pharmacyAPI.js
import axios from 'axios';

// ✅ FIXED: Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor for token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get current user from localStorage
const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
};

// ==================== PHARMACY API ====================
export const pharmacyAPI = {
  // ========== DASHBOARD METHODS (USES pharmacyId PARAMETER) ==========
  
  // Step 1: Get pharmacy by user ID
  getMyPharmacy: async () => {
    const user = getCurrentUser();
    if (!user) throw new Error('No user found');
    
    const userId = user.id || user._id;
    console.log('Fetching pharmacy for userId:', userId);
    
    const response = await api.get(`/pharmacies/dashboard/my-pharmacy?userId=${userId}`);
    return response.data;
  },

  // Step 2: All other dashboard endpoints use pharmacyId parameter
  getStats: (pharmacyId) => {
    console.log('Fetching stats for pharmacyId:', pharmacyId);
    return api.get(`/pharmacies/dashboard/${pharmacyId}/stats`);
  },

  getRecentOrders: (pharmacyId, limit = 5) => {
    console.log('Fetching orders for pharmacyId:', pharmacyId);
    return api.get(`/pharmacies/dashboard/${pharmacyId}/orders/recent?limit=${limit}`);
  },

  getInventory: (pharmacyId) => {
    console.log('Fetching inventory for pharmacyId:', pharmacyId);
    return api.get(`/pharmacies/dashboard/${pharmacyId}/medicines`);
  },

  getInventoryAlerts: (pharmacyId) => {
    return api.get(`/pharmacies/dashboard/${pharmacyId}/medicines/alerts`);
  },

  getCategoryDistribution: (pharmacyId) => {
    console.log('Fetching category distribution for pharmacyId:', pharmacyId);
    return api.get(`/pharmacies/dashboard/${pharmacyId}/categories/distribution`);
  },

  getSalesData: (pharmacyId, period = 'week') => {
    console.log('Fetching sales for pharmacyId:', pharmacyId, 'period:', period);
    return api.get(`/pharmacies/dashboard/${pharmacyId}/sales?period=${period}`);
  },

  getTopProducts: (pharmacyId, limit = 5) => {
    return api.get(`/pharmacies/dashboard/${pharmacyId}/top-products?limit=${limit}`);
  },

  // Medicine CRUD (Dashboard)
  addMedicine: (pharmacyId, medicineData) => {
    return api.post(`/pharmacies/dashboard/${pharmacyId}/medicines`, medicineData);
  },

  updateMedicine: (pharmacyId, medicineId, medicineData) => {
    return api.put(`/pharmacies/dashboard/${pharmacyId}/medicines/${medicineId}`, medicineData);
  },

  deleteMedicine: (pharmacyId, medicineId) => {
    return api.delete(`/pharmacies/dashboard/${pharmacyId}/medicines/${medicineId}`);
  },

  // Orders (Dashboard)
  getOrders: (pharmacyId) => {
    return api.get(`/pharmacies/dashboard/${pharmacyId}/orders`);
  },

  updateOrderStatus: (pharmacyId, orderId, status) => {
    return api.put(`/pharmacies/dashboard/${pharmacyId}/orders/${orderId}/status`, { status });
  },

  // ========== PUBLIC/PROFILE METHODS ==========

  // Get pharmacy profile by ID (Public)
  getPharmacyProfile: async (pharmacyId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update pharmacy profile (Authenticated)
  updatePharmacyProfile: async (pharmacyId, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/pharmacies/${pharmacyId}`, data, {
        headers: getAuthHeader()
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Upload pharmacy image (logo or banner)
  uploadPharmacyImage: async (pharmacyId, formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/pharmacies/dashboard/${pharmacyId}/upload`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Upload image (Alternative endpoint)
  uploadImage: async (pharmacyId, formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/pharmacies/${pharmacyId}/upload`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get pharmacy by user ID (for dashboard - alternative)
  getPharmacyByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies/dashboard/my-pharmacy`, {
        params: { userId },
        headers: getAuthHeader()
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get all pharmacies with filters (Public)
  getPharmacies: async (params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies`, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get nearby pharmacies (Public)
  getNearbyPharmacies: async (lat, lng, maxDistance = 5000) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies/nearby`, {
        params: { lat, lng, maxDistance }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get pharmacy stats (Public)
  getPharmacyStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies/stats`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get all cities (Public)
  getCities: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies/cities`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ========== CATEGORIES CRUD ==========
  getCategories: async (pharmacyId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies/categories/${pharmacyId}`, {
        headers: getAuthHeader()
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  createCategory: async (pharmacyId, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/pharmacies/categories/create`, 
        { pharmacyId, ...data }, 
        { headers: getAuthHeader() }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (categoryId, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/pharmacies/categories/update/${categoryId}`, data, {
        headers: getAuthHeader()
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/pharmacies/categories/delete/${categoryId}`, {
        headers: getAuthHeader()
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

// Also export the axios instance for direct use
export default api;