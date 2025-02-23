import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

const AuthenticatedRoutes = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={`/dashboard/${role}`} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard/:role"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect `/dashboard` to correct user role */}
          <Route path="/dashboard" element={<AuthenticatedRoutes />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
