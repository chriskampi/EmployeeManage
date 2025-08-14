import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from './redux/store';
import { checkAuthStatus } from './redux/actions/admin_actions';
import Login from './views/login';
import Employees from './views/employees';
import Skills from './views/skills';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.admin);
  console.log('ProtectedRoute: render called, isAuthenticated:', isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// App Routes Component
const AppRoutes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.admin);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AppRoutes: useEffect called, checking auth status');
    const checkAuth = () => {
      dispatch(checkAuthStatus());
      setIsLoading(false);
    };
    checkAuth();
  }, [dispatch]);

  console.log('AppRoutes: render called, isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  // Show loading while checking authentication
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/employees" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Catch-all route for unmatched paths */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/employees" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
