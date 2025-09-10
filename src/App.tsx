import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import LearnAboutVidyaSathi from './pages/LearnAboutVidyaSathi';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Students from './pages/Students';
import Analytics from './pages/Analytics';
import AICounselor from './pages/AICounselor';
import AIReport from './pages/AIReport';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/learn-about" element={<LearnAboutVidyaSathi />} />
            
            {/* Protected App Routes */}
            <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="student-dashboard" element={<StudentDashboard />} />
              <Route path="teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="admin-dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="ai-counselor" element={<AICounselor />} />
              <Route path="ai-report" element={<AIReport />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
