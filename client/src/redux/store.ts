import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './actions/employee_actions';
import adminReducer from './actions/admin_actions';
import skillReducer from './actions/skill_actions';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    admin: adminReducer,
    skills: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
