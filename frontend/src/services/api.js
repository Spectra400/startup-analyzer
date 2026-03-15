import axios from 'axios';

const BASE_URL = 'https://startup-analyzer-backend.onrender.com';

export const analyzeIdea = async (idea, targetUsers, country) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/analyze`,
      { idea, targetUsers, country },
      { 
        timeout: 60000,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Backend may be waking up, please try again.');
    }
    if (error.response) {
      throw new Error(`Server error: ${error.response.data?.message || error.response.statusText}`);
    }
    throw new Error('Network Error: Cannot reach backend server.');
  }
};
