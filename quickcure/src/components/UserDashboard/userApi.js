// userApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get user email from localStorage
const getUserEmail = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.email || localStorage.getItem('userEmail');
};

// Helper function to get user phone from localStorage
const getUserPhone = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.phone || localStorage.getItem('userPhone');
};

// Get all lab tests for the logged-in user
export const getUserLabTests = async () => {
  try {
    const token = getAuthToken();
    const email = getUserEmail();
    const phone = getUserPhone();
    
    console.log('Fetching lab tests with:', { email, phone, token: !!token });
    
    if (!token) {
      return {
        success: false,
        error: 'Authentication required. Please log in again.'
      };
    }

    // Build the URL with query parameters
    let url = `${API_BASE_URL}/bookings/patient/search?`;
    const params = [];
    
    if (email) {
      params.push(`email=${encodeURIComponent(email)}`);
    }
    if (phone) {
      params.push(`phone=${encodeURIComponent(phone)}`);
    }
    
    if (params.length === 0) {
      return {
        success: false,
        error: 'User information not found'
      };
    }
    
    url += params.join('&');
    
    console.log('Making API request to:', url);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', response.data);

    if (response.data.success) {
      // Transform the data to match the component's expected format
      const transformedBookings = response.data.data.map(booking => ({
        _id: booking._id,
        bookingId: booking._id,
        bookingReference: booking.bookingReference,
        bookingStatus: booking.bookingStatus,
        lab: booking.lab,
        tests: booking.tests,
        patientDetails: booking.patientDetails,
        patientName: booking.patientDetails?.name,
        email: booking.patientDetails?.email,
        phone: booking.patientDetails?.mobile,
        address: booking.patientDetails?.address,
        appointmentDetails: booking.appointmentDetails,
        date: booking.appointmentDetails?.preferredDate,
        totalAmount: booking.totalAmount,
        originalAmount: booking.originalAmount,
        discountApplied: booking.discountApplied,
        amountSaved: booking.amountSaved,
        paymentStatus: booking.paymentStatus,
        notes: booking.notes,
        groupBooking: booking.groupBooking,
        groupId: booking.groupId,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }));
      
      return {
        success: true,
        data: transformedBookings
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Failed to fetch lab tests'
      };
    }
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    
    if (error.response?.status === 401) {
      return {
        success: false,
        error: 'Session expired. Please log in again.'
      };
    }
    if (error.response?.status === 404) {
      return {
        success: false,
        error: 'API endpoint not found. Please check if the backend server is running.'
      };
    }
    return {
      success: false,
      error: error.response?.data?.error || 'Network error. Please try again.'
    };
  }
};

// Cancel a lab booking
export const cancelLabBooking = async (bookingId) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return {
        success: false,
        error: 'Authentication required. Please log in again.'
      };
    }

    const response = await axios.patch(
      `${API_BASE_URL}/bookings/${bookingId}/cancel`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      return {
        success: true,
        data: response.data.booking,
        message: response.data.message
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Failed to cancel booking'
      };
    }
  } catch (error) {
    console.error('Error cancelling booking:', error);
    if (error.response?.status === 401) {
      return {
        success: false,
        error: 'Session expired. Please log in again.'
      };
    }
    if (error.response?.status === 404) {
      return {
        success: false,
        error: 'Booking not found'
      };
    }
    return {
      success: false,
      error: error.response?.data?.error || 'Network error. Please try again.'
    };
  }
};

// Update a lab booking (edit)
export const updateLabBooking = async (updateData) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return {
        success: false,
        error: 'Authentication required. Please log in again.'
      };
    }

    const { bookingId, patientDetails, appointmentDetails, notes } = updateData;

    const response = await axios.patch(
      `${API_BASE_URL}/bookings/${bookingId}/update`,
      {
        patientDetails,
        appointmentDetails,
        notes
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      return {
        success: true,
        data: response.data.booking,
        message: 'Booking updated successfully'
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Failed to update booking'
      };
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    if (error.response?.status === 401) {
      return {
        success: false,
        error: 'Session expired. Please log in again.'
      };
    }
    if (error.response?.status === 400) {
      return {
        success: false,
        error: error.response.data.error || 'Cannot edit booking in current status'
      };
    }
    if (error.response?.status === 404) {
      return {
        success: false,
        error: 'Booking not found'
      };
    }
    return {
      success: false,
      error: error.response?.data?.error || 'Network error. Please try again.'
    };
  }
};