import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== USERS ====================
export const getUsers = async () => {
  const { data } = await api.get('/admin/users');
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/admin/users/${id}`);
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await api.put(`/admin/users/${id}/role`, { role });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/admin/users/${id}`);
  return data;
};

// ==================== CREATE ENTITIES FOR USERS ====================
export const createLabForUser = async (userId, formData) => {
  const { data } = await api.post(`/admin/create-lab-for-user/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const createPharmacyForUser = async (userId, formData) => {
  const { data } = await api.post(`/admin/create-pharmacy-for-user/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const createDoctorForUser = async (userId, formData) => {
  const { data } = await api.post(`/admin/create-doctor-for-user/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// ==================== STATS ====================
export const getAdminStats = async () => {
  const { data } = await api.get('/admin/stats');
  return data;
};

// ==================== APPOINTMENTS ====================
export const getAllAppointments = async () => {
  const { data } = await api.get('/admin/appointments');
  return data;
};

// ==================== MEDICINE ORDERS ====================
export const getAllOrders = async () => {
  const { data } = await api.get('/admin/orders');
  return data;
};

// ==================== LAB BOOKINGS ====================
export const getAllLabBookings = async () => {
  const { data } = await api.get('/admin/lab-bookings');
  return data;
};

export default api;