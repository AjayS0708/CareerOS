import apiClient from './api';

// Get all applications with filters
export const getApplications = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  const response = await apiClient.get(`/applications?${params.toString()}`);
  return response.data;
};

// Get single application by ID
export const getApplication = async (applicationId) => {
  const response = await apiClient.get(`/applications/${applicationId}`);
  return response.data;
};

// Get recent applications
export const getRecentApplications = async (limit = 5) => {
  const response = await apiClient.get(`/applications/recent?limit=${limit}`);
  return response.data;
};

// Get application statistics
export const getApplicationStats = async () => {
  const response = await apiClient.get('/applications/stats');
  return response.data;
};

// Create new application
export const createApplication = async (applicationData) => {
  const response = await apiClient.post('/applications', applicationData);
  return response.data;
};

// Update application
export const updateApplication = async (applicationId, applicationData) => {
  const response = await apiClient.put(`/applications/${applicationId}`, applicationData);
  return response.data;
};

// Delete application
export const deleteApplication = async (applicationId) => {
  const response = await apiClient.delete(`/applications/${applicationId}`);
  return response.data;
};

// Update application status
export const updateApplicationStatus = async (applicationId, status, notes = null) => {
  const response = await apiClient.patch(`/applications/${applicationId}/status`, {
    status,
    notes,
  });
  return response.data;
};

// Add interview to application
export const addInterview = async (applicationId, interviewData) => {
  const response = await apiClient.post(
    `/applications/${applicationId}/interviews`,
    interviewData
  );
  return response.data;
};

// Update interview
export const updateInterview = async (applicationId, interviewId, interviewData) => {
  const response = await apiClient.put(
    `/applications/${applicationId}/interviews/${interviewId}`,
    interviewData
  );
  return response.data;
};

// Add offer to application
export const addOffer = async (applicationId, offerData) => {
  const response = await apiClient.post(
    `/applications/${applicationId}/offer`,
    offerData
  );
  return response.data;
};

// Add contact to application
export const addContact = async (applicationId, contactData) => {
  const response = await apiClient.post(
    `/applications/${applicationId}/contacts`,
    contactData
  );
  return response.data;
};

// Toggle archive status
export const toggleArchive = async (applicationId) => {
  const response = await apiClient.patch(`/applications/${applicationId}/archive`);
  return response.data;
};
