import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export async function analyzeIdea(idea, targetUsers, country) {
  const response = await axios.post(`${API_BASE}/analyze`, {
    idea,
    targetUsers,
    country,
  });
  return response.data;
}
