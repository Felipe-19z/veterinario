import api, { setAuthToken } from './api';

export const login = async (credentials: any) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    setAuthToken(token);
    localStorage.setItem('userId', user.id);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = () => {
  setAuthToken(null);
};
