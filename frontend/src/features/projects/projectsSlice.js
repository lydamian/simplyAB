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

// selectors
const selectAllProjects = (state) => state.projects.projects;
const selectPostProjectSuccess = (state) => state.projects.postProjectSuccess;
const selectProjectStatus = (state) => state.projects.status;
const selectProjectById = (state, projectId) => (
  state.projects.projects.find((project) => project.id === projectId)
);

// thunks
const fetchProjects = createAsyncThunk('projects/fetchProjects', async (
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
      statusCode,
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

    if (error != null || projects == null) {
      return initialState.projects;
    }
    return projects;
  } catch (error) {
    logger.error(`${LOG_TAG} fetchProjects ERROR:`, error.message, error.stack);
    rejectWithValue(initialState.projects);
  }
});

const postProject = createAsyncThunk('projects/postProject', async (
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
      statusCode,
      description,
      projectId,
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

const deleteProject = createAsyncThunk('projects/deleteProject', async (
  payload,
  {
    dispatch,
    rejectWithValue,
  },
) => {
  const {
    projectId,
  } = payload;
  try {
    const response = await projectsService.deleteProject(projectId);
    const {
      error,
      statusCode,
      description,
    } = response.data;

    logger.info(
      `${LOG_TAG} deleteProject`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
    );

    if (error == null) {
      await dispatch(fetchProjects());
      dispatch(addAlert({
        message: 'Successfully deleted project',
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
    logger.error(`${LOG_TAG} deleteProject ERROR:`, error.message, error.stack);
    rejectWithValue(false);
  }
});

const updateProject = createAsyncThunk('projects/updateProject', async (
  payload,
  {
    dispatch,
    rejectWithValue,
  },
) => {
  const {
    projectId,
    title: projectTitle,
    description: projectDescription,
  } = payload;
  try {
    const response = await projectsService.updateProject(
      projectId,
      projectTitle,
      projectDescription,
    );
    const {
      error,
      statusCode,
      description,
    } = response.data;

    logger.info(
      `${LOG_TAG} updateProject`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
    );

    if (error == null) {
      await dispatch(fetchProjects());
      dispatch(addAlert({
        message: 'Successfully updated project',
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
    logger.error(`${LOG_TAG} updateProject ERROR:`, error.message, error.stack);
    rejectWithValue(false);
  }
});

const projectsSlice = createSlice({
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
        projectState.projects = projects;
        projectState.status = 'idle';
      })
      .addCase(fetchProjects.rejected, (projectState, action) => {
        const projects = action.payload;
        projectState.projects = projects;
        projectState.status = 'idle';
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
      })
      .addCase(deleteProject.pending, (projectState) => {
        projectState.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (projectState, action) => {
        projectState.status = 'idle';
      })
      .addCase(deleteProject.rejected, (projectState, action) => {
        projectState.status = 'idle';
      })
      .addCase(updateProject.pending, (projectState) => {
        projectState.status = 'loading';
      })
      .addCase(updateProject.fulfilled, (projectState, action) => {
        projectState.status = 'idle';
      })
      .addCase(updateProject.rejected, (projectState, action) => {
        projectState.status = 'idle';
      });
  },
});

// Action creators are generated for each case reducer function
const { clearPostProjectSuccess } = projectsSlice.actions;

export default projectsSlice.reducer;
export {
  // selectors
  selectAllProjects,
  selectPostProjectSuccess,
  selectProjectStatus,
  selectProjectById,

  // actions
  clearPostProjectSuccess,
  fetchProjects,
  postProject,
  deleteProject,
  updateProject,
};
