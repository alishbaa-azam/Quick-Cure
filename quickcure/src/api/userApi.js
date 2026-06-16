import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with interceptors for auth
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add user identifier for filtering
    if (user?._id || user?.id) {
      config.params = {
        ...config.params,
        userId: user._id || user.id
      };
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

// Get user's appointments
export const getUserAppointments = async () => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not logged in');
    
    // Get user's phone number or email from user object
    const userPhone = user.phone || user.mobile;
    
    // Fetch appointments by phone number (primary identifier)
    const response = await api.get(`/appointments/phone/${userPhone}`);
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.appointments || []
      };
    }
    
    return {
      success: true,
      data: []
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

// Get user's medicine orders
export const getUserOrders = async () => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not logged in');
    
    // Get orders by patient email
    const response = await api.get(`/medicine-orders/patient/${user.email}`);
    
    return {
      success: true,
      data: response.data.data || []
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch orders',
      data: []
    };
  }
};

// Get user's lab test bookings
export const getUserLabTests = async () => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not logged in');
    
    // Try to fetch by email first
    try {
      const response = await api.get(`/lab-bookings/patient/${user.email}`);
      if (response.data.success) {
        return {
          success: true,
          data: response.data.allBookings || response.data.data || []
        };
      }
    } catch (emailError) {
      console.log('No bookings found by email, trying phone...');
    }
    
    // If no results by email, try by phone
    if (user.phone || user.mobile) {
      const phoneResponse = await api.get(`/lab-bookings/phone/${user.phone || user.mobile}`);
      if (phoneResponse.data.success) {
        return {
          success: true,
          data: phoneResponse.data.allBookings || phoneResponse.data.data || []
        };
      }
    }
    
    return {
      success: true,
      data: []
    };
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch lab tests',
      data: []
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

// Cancel order
export const cancelOrder = async (orderId, reason = '') => {
  try {
    const response = await api.put(`/medicine-orders/${orderId}/cancel`, { reason });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error cancelling order:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to cancel order'
    };
  }
};

// Cancel lab test booking
export const cancelLabBooking = async (bookingId) => {
  try {
    const response = await api.patch(`/lab-bookings/${bookingId}/cancel`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error cancelling lab booking:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to cancel booking'
    };
  }
};

export default api;