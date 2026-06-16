import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) { return null; }
};

export const resolveDoctorId = async (userId) => {
  try {
    const response = await api.get(`/doctors/user/${userId}`);
    if (response.data?._id) return response.data._id;
  } catch (error) {}
  
  try {
    const response = await api.get(`/doctors/${userId}`);
    if (response.data?._id) return response.data._id;
  } catch (error) {}
  
  const user = getCurrentUser();
  if (user?.email) {
    try {
      const response = await api.get('/doctors');
      const doctors = Array.isArray(response.data) ? response.data : [];
      const match = doctors.find(d => d.email?.toLowerCase() === user.email.toLowerCase());
      if (match?._id) return match._id;
    } catch (error) {}
  }
  
  return userId;
};

export const getDoctorProfile = async (doctorId) => {
  const user = getCurrentUser();
  const resolvedDoctorId = await resolveDoctorId(doctorId);
  
  try {
    const response = await api.get(`/doctors/${resolvedDoctorId}`);
    if (response.data?._id) {
      return { success: true, data: { ...response.data, _resolvedDoctorId: resolvedDoctorId } };
    }
  } catch (error) {}
  
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
      }
    };
  }
  
  return { success: false, error: 'Failed to fetch doctor profile' };
};

export const getDoctorAppointments = async (doctorId) => {
  try {
    // IMPORTANT: Resolve the actual doctor document ID from the user ID
    const resolvedId = await resolveDoctorId(doctorId);
    
    const response = await api.get(`/appointments/doctor/${resolvedId}`);
    
    // Backend returns: { success: true, appointments: [...], data: [...] }
    let appointments = [];
    const data = response.data;
    
    if (data?.appointments && Array.isArray(data.appointments)) {
      appointments = data.appointments;
    } else if (data?.data && Array.isArray(data.data)) {
      appointments = data.data;
    } else if (Array.isArray(data)) {
      appointments = data;
    }
    
    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to fetch appointments', data: [] };
  }
};

export const getDoctorPatients = async (doctorId) => {
  try {
    // IMPORTANT: Resolve the actual doctor document ID from the user ID
    const resolvedId = await resolveDoctorId(doctorId);
    
    const response = await api.get(`/appointments/doctor/${resolvedId}/patients`);
    
    // Backend returns: { success: true, patients: [...], data: [...] }
    let patients = [];
    const data = response.data;
    
    if (data?.patients && Array.isArray(data.patients)) {
      patients = data.patients;
    } else if (data?.data && Array.isArray(data.data)) {
      patients = data.data;
    } else if (Array.isArray(data)) {
      patients = data;
    }
    
    return { success: true, data: patients };
  } catch (error) {
    console.error('Error fetching patients from endpoint:', error);
    
    // Fallback: extract unique patients from appointments
    try {
      const appointmentsResult = await getDoctorAppointments(doctorId);
      if (appointmentsResult.success && appointmentsResult.data.length > 0) {
        const appointments = appointmentsResult.data;
        const patientMap = new Map();
        
        appointments.forEach(appt => {
          const key = appt.phoneNo || appt.email || appt._id;
          if (key && !patientMap.has(key)) {
            patientMap.set(key, {
              id: key,
              name: appt.patientName || 'Unknown',
              contact: appt.phoneNo || '',
              email: appt.email || '',
              age: appt.age || '',
              gender: appt.gender || '',
              lastVisit: appt.date || '',
              totalVisits: 1
            });
          } else if (key && patientMap.has(key)) {
            const existing = patientMap.get(key);
            existing.totalVisits += 1;
          }
        });
        
        return { success: true, data: Array.from(patientMap.values()) };
      }
    } catch (fallbackError) {
      console.error('Fallback patient extraction failed:', fallbackError);
    }
    
    return { success: false, error: 'Failed to fetch patients', data: [] };
  }
};

export const updateAppointmentStatus = async (appointmentId, newStatus) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/status`, { status: newStatus });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update appointment' };
  }
};

export const sendMeetLinkToPatient = async (appointmentId, meetLink) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/send-meet-link`, { meetLink });
    return { success: true, data: response.data, message: response.data.message };
  } catch (error) {
    console.error('Error sending meet link:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to send meet link' };
  }
};

export const getDoctorProfileByUserId = async (userId) => {
  try {
    const response = await api.get(`/doctors/user/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch doctor profile' };
  }
};

export const updateDoctorProfile = async (doctorId, formData) => {
  try {
    const response = await api.put(`/doctors/${doctorId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update profile',
      status: error.response?.status
    };
  }
};

export default api;