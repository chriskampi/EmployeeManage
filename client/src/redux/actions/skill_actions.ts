import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Skill {
  id: number;
  title: string;
}

interface SkillState {
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  skills: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (search?: string) => {
    const response = await axios.get(`/api/skills/getSkills${search ? `?search=${search}` : ''}`);
    return response.data.data;
  }
);

export const createSkill = createAsyncThunk(
  'skills/createSkill',
  async (skillData: { title: string }) => {
    const response = await axios.post('/api/skills/createSkill', skillData);
    return response.data.data;
  }
);

export const updateSkill = createAsyncThunk(
  'skills/updateSkill',
  async (skillData: { id: number; title: string }) => {
    const response = await axios.put('/api/skills/updateSkill', skillData);
    return response.data.data;
  }
);

export const deleteSkill = createAsyncThunk(
  'skills/deleteSkill',
  async (id: number) => {
    await axios.delete(`/api/skills/deleteSkill?id=${id}`);
    return id;
  }
);

const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch skills';
      })
      // Create skill
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      // Update skill
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex(skill => skill.id === action.payload.id);
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      })
      // Delete skill
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(skill => skill.id !== action.payload);
      });
  },
});

export const { clearError } = skillSlice.actions;
export default skillSlice.reducer;
