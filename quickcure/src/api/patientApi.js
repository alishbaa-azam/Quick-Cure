import axios from 'axios';

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

// Register a new patient (used by doctor dashboard)
export const registerPatient = async (patientData) => {
  try {
    const response = await api.post('/patients/register', patientData);
    return {
      success: true,
      data: response.data.data,
      isNew: response.data.isNew
    };
  } catch (error) {
    console.error('Error registering patient:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to register patient'
    };
  }
};

// Get patient by email
export const getPatientByEmail = async (email) => {
  try {
    const response = await api.get(`/patients/email/${encodeURIComponent(email)}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Patient not found',
      data: null
    };
  }
};

// Get patient by ID
export const getPatientById = async (patientId) => {
  try {
    const response = await api.get(`/patients/${patientId}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch patient'
    };
  }
};

// Update patient
export const updatePatient = async (patientId, updateData) => {
  try {
    const response = await api.put(`/patients/${patientId}`, updateData);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to update patient'
    };
  }
};

export default api;