/* eslint-disable semi */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logger from 'utils/logger';
import projectsService from 'services/projects'

const LOG_TAG = '[projectsSlice]';

const initialState = {
  status: 'idle',
  projects: [],
};

export const fetchProjects = createAsyncThunk('applicants/fetchProjects', async () => {
  try {
    const response = await projectsService.getProjects();
    const {
      error,
      status_code: statusCode,
      description,
      projects,
    } = response.data;

    logger.info(
      `${LOG_TAG} fetchProjects`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `projects: ${JSON.stringify(projects)}`,
    );

    return {
      projects,
    };
  } catch (error) {
    logger.error(`${LOG_TAG} fetchProjects ERROR:`, error.message, error.stack);
    return {
      projects: initialState.projects,
    };
  }
});

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
