/* eslint-disable semi */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectsService from 'services/projects';

export const fetchProjects = createAsyncThunk('applicants/fetchExperiments', async () => {
  const response = await projectsService.getProjects();
  return response;
});

const initialState = {
  status: 'idle',
  projects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        const { projects } = action.payload;
        state.projects = projects
        state.status = 'idle';
      });
  },
});

export const getProjects = (state) => state.projects.projects

// Action creators are generated for each case reducer function
export const { updateProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
