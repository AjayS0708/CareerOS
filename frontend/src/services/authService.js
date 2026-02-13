import apiClient from './api';

// Register new user
export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  if (response.data.success) {
    // Store token and user data
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

// Logout user
export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    // Clear local storage regardless of API response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Get current user
export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

// Update user profile
export const updateProfile = async (profileData) => {
  const response = await apiClient.put('/auth/profile', profileData);
  if (response.data.success) {
    // Update user data in local storage
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await apiClient.put('/auth/change-password', passwordData);
  return response.data;
};

// Get user from local storage
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get token from local storage
export const getStoredToken = () => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getStoredToken();
};
