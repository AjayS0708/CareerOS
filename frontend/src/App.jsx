import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route 
            path="/jobs" 
            element={
              <PlaceholderPage 
                title="Job Search" 
                description="Discover thousands of job opportunities across multiple platforms."
              />
            } 
          />
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
    </Router>
  );
}

export default App;
