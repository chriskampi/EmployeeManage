import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  skill_title?: string;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (search?: string) => {
    const response = await axios.get(`/api/employees/getEmployees${search ? `?search=${search}` : ''}`);
    return response.data.data;
  }
);

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData: { firstname: string; lastname: string; email: string }) => {
    const response = await axios.post('/api/employees/createEmployee', employeeData);
    return response.data.data;
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async (employeeData: { id: number; firstname: string; lastname: string; email: string }) => {
    const response = await axios.put('/api/employees/updateEmployee', employeeData);
    return response.data.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: number) => {
    await axios.delete(`/api/employees/deleteEmployee?id=${id}`);
    return id;
  }
);

export const addSkillToEmployee = createAsyncThunk(
  'employees/addSkill',
  async ({ employee_id, skill_id }: { employee_id: number; skill_id: number }) => {
    const response = await axios.post('/api/employees/addSkill', { employee_id, skill_id });
    return response.data.data;
  }
);

export const removeSkillFromEmployee = createAsyncThunk(
  'employees/removeSkill',
  async ({ employee_id, skill_id }: { employee_id: number; skill_id: number }) => {
    await axios.delete(`/api/employees/removeSkill?employee_id=${employee_id}&skill_id=${skill_id}`);
    return { employee_id, skill_id };
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      // Create employee
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      // Delete employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
