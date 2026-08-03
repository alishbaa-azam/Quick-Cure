import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Get search suggestions based on query
 * @param {string} query - Search query (minimum 1 character)
 * @returns {Promise} Search suggestions
 */
export const getSuggestions = async (query) => {
  try {
    if (!query || query.trim().length < 1) {
      return { success: true, data: { suggestions: [] } };
    }
    
    const response = await api.get('/search/suggestions', {
      params: { query: query.trim() }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Suggestions error:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to get suggestions',
      data: null
    };
  }
};

/**
 * Unified search across doctors, labs, and pharmacies
 * @param {string} query - Search query (minimum 2 characters)
 * @param {string} type - Optional filter: 'doctors', 'labs', 'pharmacies', or 'all'
 * @returns {Promise} Search results
 */
export const unifiedSearch = async (query, type = 'all') => {
  try {
    console.log('Searching for:', query, 'type:', type);
    const response = await api.get('/search', {
      params: { query, type }
    });
    console.log('Search response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Search error:', error);
    console.error('Error response:', error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to perform search',
      data: null
    };
  }
};

export default { unifiedSearch, getSuggestions };
