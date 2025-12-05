import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api', // Explicitly set for development
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the authorization token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token); // Persist token
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token'); // Remove token
  }
};

// Check local storage for token on initial load
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}


// Auth API calls
export const loginUser = (credentials: any) => api.post('/auth/login', credentials);
export const registerUser = (userData: any) => api.post('/auth/register', userData);
export const getUserProfile = () => api.get('/auth/profile');
export const deleteUser = (userId: number) => api.delete(`/users/${userId}`);

export const logoutUser = () => {
    // No specific API call, just clear the token
    setAuthToken(null);
    return Promise.resolve();
};

// Feedback Topics API
export const getTopics = () => api.get('/feedback/topics');
export const getTopicById = (id: string) => api.get(`/feedback/topics/${id}`);
export const createTopic = (data: { title: string; description: string; authorId: number }) => api.post('/feedback/topics', data);

// Feedback Comments API
export const createComment = (topicId: string, data: { content: string; authorId: number }) => api.post(`/feedback/topics/${topicId}/comments`, data);
export const updateComment = (commentId: string, content: string) => api.put(`/feedback/comments/${commentId}`, { content });
export const deleteComment = (commentId: string) => api.delete(`/feedback/comments/${commentId}`);

export default api;