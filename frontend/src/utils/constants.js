// Brand Colors
export const COLORS = {
  primary: '#1D4ED8',
  accent: '#7C3AED',
  background: '#F8FAFC',
  text: '#0F172A',
};

// Application Status
export const APPLICATION_STATUS = {
  SAVED: 'saved',
  REDIRECTED: 'redirected',
  APPLIED: 'applied',
  REVIEWING: 'reviewing',
  INTERVIEW: 'interview',
  OFFERED: 'offered',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
};

// Badge Variants for Status
export const STATUS_BADGE_VARIANTS = {
  [APPLICATION_STATUS.SAVED]: 'info',
  [APPLICATION_STATUS.REDIRECTED]: 'info',
  [APPLICATION_STATUS.APPLIED]: 'applied',
  [APPLICATION_STATUS.REVIEWING]: 'warning',
  [APPLICATION_STATUS.INTERVIEW]: 'interview',
  [APPLICATION_STATUS.OFFERED]: 'success',
  [APPLICATION_STATUS.ACCEPTED]: 'success',
  [APPLICATION_STATUS.REJECTED]: 'rejected',
  [APPLICATION_STATUS.WITHDRAWN]: 'declined',
};

// Job Types
export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
};

// Experience Levels
export const EXPERIENCE_LEVELS = {
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
};

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  JOB_DETAILS: '/jobs/:id',
  APPLICATIONS: '/applications',
  RESUME: '/resume',
  ROADMAPS: '/roadmaps',
  ROADMAP_DETAILS: '/roadmaps/:id',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
};

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  
  // Jobs
  JOBS: '/jobs',
  JOB_DETAILS: (id) => `/jobs/${id}`,
  TRACK_VIEW: (id) => `/jobs/${id}/track-view`,
  TRACK_REDIRECT: (id) => `/jobs/${id}/track-redirect`,
  
  // Applications
  APPLICATIONS: '/applications',
  APPLICATION_DETAILS: (id) => `/applications/${id}`,
  UPDATE_STATUS: (id) => `/applications/${id}/status`,
  
  // Resume
  RESUMES: '/resumes',
  RESUME_DETAILS: (id) => `/resumes/${id}`,
  CALCULATE_ATS: (id) => `/resumes/${id}/calculate-ats`,
  
  // Roadmaps
  ROADMAPS: '/roadmaps',
  ROADMAP_DETAILS: (id) => `/roadmaps/${id}`,
  ROADMAP_PROGRESS: (id) => `/roadmaps/${id}/progress`,
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'careeros_auth_token',
  USER_DATA: 'careeros_user_data',
  THEME: 'careeros_theme',
};
