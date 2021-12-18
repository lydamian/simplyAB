/* eslint-disable semi */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logger from 'utils/logger';
import projectsService from 'services/projects';
import { addAlert } from 'features/alerts/alertsSlice';

const LOG_TAG = '[projectsSlice]';

const initialState = {
  status: 'idle',
  projects: [],
  postProjectSuccess: null,
};

export const fetchProjects = createAsyncThunk('applicants/fetchProjects', async (
  _payload,
  {
    getState,
    rejectWithValue,
  },
) => {
  try {
    const userId = getState().auth.user.id;
    const response = await projectsService.getProjects(userId);
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

    return projects;
  } catch (error) {
    logger.error(`${LOG_TAG} fetchProjects ERROR:`, error.message, error.stack);
    rejectWithValue(initialState.projects);
  }
});

export const postProject = createAsyncThunk('applicants/postProject', async (
  payload,
  {
    dispatch,
    rejectWithValue,
  },
) => {
  const {
    title,
    description: projectDescription,
  } = payload;
  try {
    const response = await projectsService.createProject(
      title,
      projectDescription,
    );
    const {
      error,
      status_code: statusCode,
      description,
      project_id: projectId,
    } = response.data;

    logger.info(
      `${LOG_TAG} postProject`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `projects: ${JSON.stringify(projectId)}`,
    );

    if (error == null) {
      dispatch(fetchProjects);
      dispatch(addAlert({
        message: 'Successfully created new project',
        type: 'SUCCESS',
      }));
      return true;
    }
    dispatch(addAlert({
      message: description,
      type: 'DANGER',
    }));
    return false;
  } catch (error) {
    logger.error(`${LOG_TAG} postProject ERROR:`, error.message, error.stack);
    rejectWithValue(false);
  }
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearPostProjectSuccess(projectState, action) {
      projectState.postProjectSuccess = initialState.postProjectSuccess;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (projectState) => {
        projectState.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (projectState, action) => {
        const projects = action.payload;
        projectState.projects = projects
        projectState.status = 'idle';
      })
      .addCase(fetchProjects.rejected, (projectState, action) => {
        const projects = action.payload;
        projectState.projects = projects;
        projectState.status = 'idle'
      })
      .addCase(postProject.pending, (projectState) => {
        projectState.status = 'loading';
      })
      .addCase(postProject.fulfilled, (projectState, action) => {
        const success = action.payload;
        projectState.status = 'idle';
        projectState.postProjectSuccess = success;
      })
      .addCase(postProject.rejected, (projectState, action) => {
        const success = action.payload;
        projectState.postProjectSuccess = success;
        projectState.status = 'idle';
      });
  },
});

// getters
export const getProjects = (state) => state.projects.projects;
export const getPostProjectSuccess = (state) => state.projects.postProjectSuccess;

// Action creators are generated for each case reducer function
export const { clearPostProjectSuccess } = projectsSlice.actions;

export default projectsSlice.reducer;
