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

// Upload a prescription file and attach it to an existing prescription
export const uploadPrescriptionFile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/prescriptions/upload`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Error uploading prescription file:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to upload prescription file' };
  }
};

// Update an existing prescription (edit)
export const updatePrescription = async (prescriptionId, prescriptionData) => {
  try {
    const response = await api.put(`/prescriptions/${prescriptionId}`, prescriptionData);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Error updating prescription:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update prescription'
    };
  }
};

// Get prescriptions for a doctor
export const getDoctorPrescriptions = async (doctorId) => {
  try {
    const response = await api.get(`/prescriptions/doctor/${doctorId}`);
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

// Get prescriptions for a patient by email (for user dashboard)
export const getPatientPrescriptions = async (patientEmail) => {
  try {
    const response = await api.get(`/prescriptions/patient/${encodeURIComponent(patientEmail)}`);
    return {
      success: true,
      data: response.data.data || []
    };
  } catch (error) {
    console.error('Error fetching patient prescriptions:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch prescriptions',
      data: []
    };
  }
};

// Get prescription by ID
export const getPrescriptionById = async (prescriptionId) => {
  try {
    const response = await api.get(`/prescriptions/${prescriptionId}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Error fetching prescription:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch prescription'
    };
  }
};

// Delete prescription
export const deletePrescription = async (prescriptionId) => {
  try {
    const response = await api.delete(`/prescriptions/${prescriptionId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting prescription:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete prescription'
    };
  }
};

export default api;