import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout';
import DashboardPage from './pages/DashboardPage';
import JobSearchPage from './pages/JobSearchPage';
import PlaceholderPage from './pages/PlaceholderPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { isAuthenticated } from './services/authService';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#0F172A',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/jobs" element={<JobSearchPage />} />
                  <Route 
                    path="/applications" 
                    element={
                      <PlaceholderPage 
                        title="My Applications" 
                        description="Track all your job applications in one place."
                      />
                    } 
                  />
                  <Route 
                    path="/resume" 
                    element={
                      <PlaceholderPage 
                        title="Resume Builder" 
                        description="Create ATS-friendly resumes with real-time scoring."
                      />
                    } 
                  />
                  <Route 
                    path="/roadmaps" 
                    element={
                      <PlaceholderPage 
                        title="Learning Paths" 
                        description="Follow structured learning roadmaps to advance your career."
                      />
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <PlaceholderPage 
                        title="Settings" 
                        description="Manage your account preferences and settings."
                      />
                    } 
                  />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
