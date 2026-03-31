
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { 'Content-Type': 'application/json' }
// });

// // Request interceptor for token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Get current user from localStorage
// const getCurrentUser = () => {
//   const userStr = localStorage.getItem('user');
//   return userStr ? JSON.parse(userStr) : null;
// };

// // ==================== PHARMACY API ====================
// export const pharmacyAPI = {
//   // Step 1: Get pharmacy by user ID
//   getMyPharmacy: async () => {
//     const user = getCurrentUser();
//     if (!user) throw new Error('No user found');
    
//     const userId = user.id || user._id;
//     console.log('Fetching pharmacy for userId:', userId);
    
//     // ✅ FIXED: Use /pharmacies/dashboard/ instead of /pharmacy-dashboard/
//     const response = await api.get(`/pharmacies/dashboard/my-pharmacy?userId=${userId}`);
//     return response.data;
//   },

//   // Step 2: All other endpoints use pharmacyId parameter
//   getStats: (pharmacyId) => {
//     console.log('Fetching stats for pharmacyId:', pharmacyId);
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/stats`);
//   },

//   getRecentOrders: (pharmacyId, limit = 5) => {
//     console.log('Fetching orders for pharmacyId:', pharmacyId);
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/orders/recent?limit=${limit}`);
//   },

//   getInventory: (pharmacyId) => {
//     console.log('Fetching inventory for pharmacyId:', pharmacyId);
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/medicines`);
//   },

//   getInventoryAlerts: (pharmacyId) => {
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/medicines/alerts`);
//   },

//   getCategories: (pharmacyId) => {
//     console.log('Fetching categories for pharmacyId:', pharmacyId);
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/categories/distribution`);
//   },

//   getSalesData: (pharmacyId, period = 'week') => {
//     console.log('Fetching sales for pharmacyId:', pharmacyId, 'period:', period);
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/sales?period=${period}`);
//   },

//   getTopProducts: (pharmacyId, limit = 5) => {
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/top-products?limit=${limit}`);
//   },

//   // Medicine CRUD
//   addMedicine: (pharmacyId, medicineData) => {
//     return api.post(`/pharmacies/dashboard/${pharmacyId}/medicines`, medicineData);
//   },

//   updateMedicine: (pharmacyId, medicineId, medicineData) => {
//     return api.put(`/pharmacies/dashboard/${pharmacyId}/medicines/${medicineId}`, medicineData);
//   },

//   deleteMedicine: (pharmacyId, medicineId) => {
//     return api.delete(`/pharmacies/dashboard/${pharmacyId}/medicines/${medicineId}`);
//   },

//   // Orders
//   getOrders: (pharmacyId) => {
//     return api.get(`/pharmacies/dashboard/${pharmacyId}/orders`);
//   },

//   updateOrderStatus: (pharmacyId, orderId, status) => {
//     return api.put(`/pharmacies/dashboard/${pharmacyId}/orders/${orderId}/status`, { status });
//   }
// };

// export default api;






















































// product page working now
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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

// Get current user from localStorage
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// ==================== PHARMACY API ====================
export const pharmacyAPI = {
  // Step 1: Get pharmacy by user ID
  getMyPharmacy: async () => {
    const user = getCurrentUser();
    if (!user) throw new Error('No user found');
    
    const userId = user.id || user._id;
    console.log('Fetching pharmacy for userId:', userId);
    
    // ✅ Using /pharmacies/dashboard/my-pharmacy?userId=...
    const response = await api.get(`/pharmacies/dashboard/my-pharmacy?userId=${userId}`);
    return response.data;
  },

  // Step 2: All other endpoints use pharmacyId parameter
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

  getCategories: (pharmacyId) => {
    console.log('Fetching categories for pharmacyId:', pharmacyId);
    return api.get(`/pharmacies/dashboard/${pharmacyId}/categories/distribution`);
  },

  getSalesData: (pharmacyId, period = 'week') => {
    console.log('Fetching sales for pharmacyId:', pharmacyId, 'period:', period);
    return api.get(`/pharmacies/dashboard/${pharmacyId}/sales?period=${period}`);
  },

  getTopProducts: (pharmacyId, limit = 5) => {
    return api.get(`/pharmacies/dashboard/${pharmacyId}/top-products?limit=${limit}`);
  },

  // Medicine CRUD
  addMedicine: (pharmacyId, medicineData) => {
    return api.post(`/pharmacies/dashboard/${pharmacyId}/medicines`, medicineData);
  },

  updateMedicine: (pharmacyId, medicineId, medicineData) => {
    return api.put(`/pharmacies/dashboard/${pharmacyId}/medicines/${medicineId}`, medicineData);
  },

  deleteMedicine: (pharmacyId, medicineId) => {
    return api.delete(`/pharmacies/dashboard/${pharmacyId}/medicines/${medicineId}`);
  },

  // Orders
  getOrders: (pharmacyId) => {
    return api.get(`/pharmacies/dashboard/${pharmacyId}/orders`);
  },

  updateOrderStatus: (pharmacyId, orderId, status) => {
    return api.put(`/pharmacies/dashboard/${pharmacyId}/orders/${orderId}/status`, { status });
  },


  // Add these methods to your pharmacyAPI service

// Get pharmacy profile
getPharmacyProfile: async (pharmacyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}`);
    return response;
  } catch (error) {
    throw error;
  }
},

// Update pharmacy profile
updatePharmacyProfile: async (pharmacyId, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/pharmacies/${pharmacyId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
},

// Upload image
uploadImage: async (pharmacyId, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pharmacies/${pharmacyId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
},
};

export default api;