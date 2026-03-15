import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function analyzeIdea(idea, targetUsers, country) {
  const response = await axios.post(`${BASE_URL}/api/analyze`, {
    idea,
    targetUsers,
    country,
  });
  return response.data;
}
