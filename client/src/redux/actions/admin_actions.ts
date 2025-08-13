import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Admin {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface AdminState {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admin: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks
export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.get(`/api/admin/login?email=${credentials.email}&password=${credentials.password}`);
    return response.data.data;
  }
);

export const logoutAdmin = createAsyncThunk(
  'admin/logout',
  async () => {
    // Clear local storage or any other cleanup
    localStorage.removeItem('admin');
    return null;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    checkAuthStatus: (state) => {
      const adminData = localStorage.getItem('admin');
      if (adminData) {
        try {
          state.admin = JSON.parse(adminData);
          state.isAuthenticated = true;
        } catch (error) {
          localStorage.removeItem('admin');
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        // Store in localStorage
        localStorage.setItem('admin', JSON.stringify(action.payload));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError, checkAuthStatus } = adminSlice.actions;
export default adminSlice.reducer;
