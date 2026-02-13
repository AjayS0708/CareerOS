import apiClient from './api';

// Get all jobs with filters
export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  const response = await apiClient.get(`/jobs?${params.toString()}`);
  return response.data;
};

// Get single job by ID
export const getJob = async (jobId) => {
  const response = await apiClient.get(`/jobs/${jobId}`);
  return response.data;
};

// Get trending jobs
export const getTrendingJobs = async (limit = 10) => {
  const response = await apiClient.get(`/jobs/trending?limit=${limit}`);
  return response.data;
};

// Get job recommendations
export const getRecommendations = async (limit = 10) => {
  const response = await apiClient.get(`/jobs/recommendations?limit=${limit}`);
  return response.data;
};

// Get job statistics
export const getJobStats = async () => {
  const response = await apiClient.get('/jobs/stats');
  return response.data;
};

// Create new job (admin)
export const createJob = async (jobData) => {
  const response = await apiClient.post('/jobs', jobData);
  return response.data;
};

// Update job (admin)
export const updateJob = async (jobId, jobData) => {
  const response = await apiClient.put(`/jobs/${jobId}`, jobData);
  return response.data;
};

// Delete job (admin)
export const deleteJob = async (jobId) => {
  const response = await apiClient.delete(`/jobs/${jobId}`);
  return response.data;
};
