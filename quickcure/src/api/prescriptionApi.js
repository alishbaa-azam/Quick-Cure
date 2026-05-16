import axios from 'axios';
import { resolveDoctorId } from './doctorApi';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create a new prescription
export const createPrescription = async (prescriptionData) => {
  try {
    const response = await api.post('/prescriptions', prescriptionData);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Error creating prescription:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create prescription'
    };
  }
};

// Get prescriptions for a doctor
export const getDoctorPrescriptions = async (doctorId) => {
  try {
    const resolvedId = await resolveDoctorId(doctorId);
    const response = await api.get(`/prescriptions/doctor/${resolvedId}`);
    return {
      success: true,
      data: response.data.data || []
    };
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch prescriptions',
      data: []
    };
  }
};

export default api;