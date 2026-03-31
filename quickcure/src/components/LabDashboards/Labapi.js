
// labApi.js — All API calls for the Lab Dashboard in one place
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000/api';

// Configure axios once
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach auth token if present
api.interceptors.request.use((config) => {
  const user = labAPI.getCurrentUser();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const labAPI = {
  // ── Auth ──────────────────────────────────────────────
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  },

  // ── Labs ──────────────────────────────────────────────
  async fetchAllLabs() {
    const { data } = await api.get('/labs');
    return data;
  },

  async updateLabProfile(labId, formData) {
    const { data } = await api.put(`/labs/${labId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  // ── Tests ─────────────────────────────────────────────
  async fetchTests(labId) {
    const { data } = await api.get(`/tests/lab/${labId}`);
    return data;
  },

  async createTest(values) {
    const { data } = await api.post('/tests', values);
    return data;
  },

  async updateTest(id, values) {
    const { data } = await api.put(`/tests/${id}`, values);
    return data;
  },

  async deleteTest(id) {
    const { data } = await api.delete(`/tests/${id}`);
    return data;
  },

  // ── Bookings ──────────────────────────────────────────
  async fetchBookings(labId) {
    const { data } = await api.get(`/bookings/lab/${labId}`);
    return data;
  },

  async updateBookingStatus(id, status) {
    const { data } = await api.put(`/bookings/${id}/status`, { status });
    return data;
  },

  async fetchPatientHistory(patientId) {
    const { data } = await api.get(`/bookings/patient/${patientId}/history`);
    return data;
  },

  // ── Collections ───────────────────────────────────────
  async fetchCollections(labId) {
    const { data } = await api.get(`/collections/lab/${labId}`);
    return data;
  },

  async scheduleCollection(payload) {
    const { data } = await api.post('/collections', payload);
    return data;
  },

  async assignCollector(collectionId, assignData) {
    const { data } = await api.patch(`/collections/${collectionId}/assign`, assignData);
    return data;
  },

  async updateCollectionStatus(collectionId, action) {
    const { data } = await api.patch(`/collections/${collectionId}/status`, { action });
    return data;
  },

  // ── Reports ───────────────────────────────────────────
  async fetchReports(labId) {
    const { data } = await api.get(`/reports/lab/${labId}`);
    return data;
  },

  async uploadReport(formData) {
    const { data } = await api.post('/reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async verifyReport(reportId, status, remarks) {
    const { data } = await api.patch(`/reports/${reportId}/verify`, { status, remarks });
    return data;
  },

  // ── Patients ──────────────────────────────────────────
  async fetchPatients(labId) {
    const { data } = await api.get(`/patients/lab/${labId}`);
    return data;
  },
};

export default labAPI;