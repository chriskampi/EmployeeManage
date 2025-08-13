import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logoutAdmin } from '../redux/actions/admin_actions';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { admin, isAuthenticated } = useSelector((state: RootState) => state.admin);

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <nav className="flex space-x-6">
              <button
                onClick={() => navigate('/employees')}
                className="hover:text-blue-200 transition-colors"
              >
                Employees
              </button>
              <button
                onClick={() => navigate('/skills')}
                className="hover:text-blue-200 transition-colors"
              >
                Skills
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Welcome, {admin?.firstname} {admin?.lastname}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
