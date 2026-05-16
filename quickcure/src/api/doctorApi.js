import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
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

// Helper to get current user
const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
};

// Resolve the actual doctor document ID from various lookup strategies
export const resolveDoctorId = async (userId) => {
  // Strategy 1: Try to find doctor by user ID reference
  try {
    const response = await api.get(`/doctors/user/${userId}`);
    if (response.data && response.data._id) {
      return response.data._id;
    }
  } catch (error) {
    console.log('Could not resolve doctor ID by user reference');
  }

  // Strategy 2: Try by direct doctor ID lookup
  try {
    const response = await api.get(`/doctors/${userId}`);
    if (response.data && response.data._id) {
      return response.data._id;
    }
  } catch (error) {
    console.log('Could not resolve doctor ID by direct lookup');
  }

  // Strategy 3: Try email lookup
  const user = getCurrentUser();
  if (user?.email) {
    try {
      const allDocsResponse = await api.get('/doctors');
      const allDoctors = Array.isArray(allDocsResponse.data) ? allDocsResponse.data : [];
      const matchingDoctor = allDoctors.find(doc => 
        doc.email?.toLowerCase() === user.email.toLowerCase()
      );
      if (matchingDoctor?._id) {
        return matchingDoctor._id;
      }
    } catch (error) {
      console.log('Could not resolve doctor ID by email');
    }
  }

  // Fallback: use the provided userId
  return userId;
};

// Fetch doctor profile - tries multiple lookup strategies
export const getDoctorProfile = async (doctorId) => {
  const user = getCurrentUser();
  const resolvedDoctorId = await resolveDoctorId(doctorId);
  
  // Try to get the actual doctor document using resolved ID
  try {
    const response = await api.get(`/doctors/${resolvedDoctorId}`);
    if (response.data && response.data._id) {
      return {
        success: true,
        data: { ...response.data, _resolvedDoctorId: resolvedDoctorId }
      };
    }
  } catch (error) {
    console.log('Could not fetch doctor document with resolved ID');
  }

  // Try doctor registration data
  if (user?.email) {
    try {
      const regResponse = await api.get(`/doctor-registration/check-status?email=${user.email}`);
      if (regResponse.data && (regResponse.data.registrationStatus === 'approved' || regResponse.data._id)) {
        return {
          success: true,
          data: { ...regResponse.data, _resolvedDoctorId: resolvedDoctorId },
          fromRegistration: true
        };
      }
    } catch (regError) {
      console.log('Registration lookup failed');
    }
  }

  // Fallback: Return basic user data so dashboard still works
  if (user) {
    return {
      success: true,
      data: {
        name: user.name,
        email: user.email,
        _id: user.id || user._id,
        _resolvedDoctorId: resolvedDoctorId,
        speciality: 'Doctor',
        qualification: '',
        fromUser: true
      }
    };
  }

  return {
    success: false,
    error: 'Failed to fetch doctor profile'
  };
};

// Fetch doctor's appointments - resolves doctor ID first, then fetches
export const getDoctorAppointments = async (doctorId) => {
  // First, resolve the actual doctor document ID
  const resolvedDoctorId = await resolveDoctorId(doctorId);
  
  try {
    const response = await api.get(`/appointments/doctor/${resolvedDoctorId}`);
    return {
      success: true,
      data: response.data.appointments || response.data || []
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch appointments',
      data: []
    };
  }
};

// Update appointment status
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/status`, { status });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update appointment'
    };
  }
};

// Cancel appointment
export const cancelAppointment = async (appointmentId, reason = '') => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/cancel`, { reason });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to cancel appointment'
    };
  }
};

// Fetch all doctors (for reference)
export const getAllDoctors = async () => {
  try {
    const response = await api.get('/doctors');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch doctors'
    };
  }
};

// Fetch doctor's patients (unique patients from appointments)
export const getDoctorPatients = async (doctorId) => {
  try {
    const response = await api.get(`/appointments/doctor/${doctorId}`);
    const appointments = response.data.appointments || response.data || [];
    
    // Extract unique patients from appointments
    const patientMap = new Map();
    appointments.forEach(appt => {
      const patientId = appt.patientId || appt.patientEmail || appt.phoneNo;
      if (patientId && !patientMap.has(patientId)) {
        patientMap.set(patientId, {
          id: patientId,
          name: appt.patientName || 'Unknown',
          contact: appt.phoneNo || appt.contact || '',
          email: appt.patientEmail || appt.email || '',
          age: appt.patientAge || '',
          gender: appt.patientGender || '',
          lastVisit: appt.date || '',
          totalVisits: 1
        });
      } else if (patientId && patientMap.has(patientId)) {
        const patient = patientMap.get(patientId);
        patient.totalVisits += 1;
        if (appt.date > patient.lastVisit) {
          patient.lastVisit = appt.date;
        }
      }
    });
    
    return {
      success: true,
      data: Array.from(patientMap.values())
    };
  } catch (error) {
    console.error('Error fetching patients:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch patients',
      data: []
    };
  }
};

export default api;