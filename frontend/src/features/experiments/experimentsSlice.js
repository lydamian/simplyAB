/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import experimentsService from 'services/experiments';
import { addAlert, ALERT_TYPES } from 'features/alerts/alertsSlice';
import logger from 'utils/logger';

const LOG_TAG = '[experimentsSlice]';

const initialState = {
  status: 'idle',
  experiments: {},
};

// thunks
const fetchExperiments = createAsyncThunk('experiments/fetchExperiments', async (
  payload,
  {
    rejectWithValue,
  },
) => {
  try {
    const {
      projectId,
      experimentId,
    } = payload;
    const response = await experimentsService.getExperiments(
      projectId,
      experimentId,
    );

    const {
      error,
      statusCode,
      description,
      experiments,
    } = response.data;

    logger.info(
      `${LOG_TAG} fetchAllExperiments`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `experiments: ${JSON.stringify(experiments)}`,
    );

    if (error != null) {
      return initialState.experiments;
    }
    return experiments.reduce((hash, experiment) => {
      hash[experiment.id] = experiment;
      return hash;
    }, {});
  } catch (error) {
    logger.error(`${LOG_TAG} fetchAllExperiments ERROR:`, error.message, error.stack);
    rejectWithValue(initialState.experiments);
  }
});

const createExperiment = createAsyncThunk('experiments/createExperiment', async (
  payload,
  {
    rejectWithValue,
    dispatch,
  },
) => {
  try {
    const {
      projectId,
      key,
      title,
      description: experimentDescription,
      trafficAllocationPercentage,
    } = payload;
    const response = await experimentsService.createExperiment(
      projectId,
      key,
      title,
      experimentDescription,
      trafficAllocationPercentage,
    );

    const {
      error,
      statusCode,
      description,
      experimentId,
    } = response.data;

    logger.info(
      `${LOG_TAG} createExperiment`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `experiment_id: ${experimentId}`,
    );

    if (error != null) {
      dispatch(addAlert({
        message: 'Error creating experiment',
        type: ALERT_TYPES.DANGER,
      }));
      return rejectWithValue(false);
    }
    dispatch(addAlert({
      message: 'Successfully created experiment',
      type: ALERT_TYPES.SUCCESS,
    }));
    return true;
  } catch (error) {
    logger.error(`${LOG_TAG} createExperiment ERROR:`, error.message, error.stack);
    return rejectWithValue(false);
  }
});

const updateExperiment = createAsyncThunk('experiments/updateExperiment', async (
  payload,
  {
    rejectWithValue,
  },
) => {
  try {
    const {
      experimentId,
      key,
      title,
      description: experimentDescription,
      trafficAllocationPercentage,
      status,
    } = payload;
    const response = await experimentsService.updateExperiment(
      experimentId,
      key,
      title,
      experimentDescription,
      trafficAllocationPercentage,
      status,
    );

    const {
      error,
      statusCode,
      description,
      success,
    } = response.data;

    logger.info(
      `${LOG_TAG} updateExperiment`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `success: ${success}`,
    );

    if (error != null) {
      return false;
    }
    return success;
  } catch (error) {
    logger.error(`${LOG_TAG} updateExperiment ERROR:`, error.message, error.stack);
    rejectWithValue(false);
  }
});

// selectors
const selectAllExperiments = (state) => Object.values(state.experiments.experiments);
const selectExperimentById = (state, experimentId) => (
  state.experiments.experiments[experimentId]
);

const experimentsSlice = createSlice({
  name: 'experiments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiments.fulfilled, (state, action) => {
        const experiments = action.payload;
        state.experiments = {
          ...state.experiments,
          ...experiments,
        };
        state.status = 'idle';
      })
      .addCase(fetchExperiments.rejected, (state, action) => {
        const experiments = action.payload;
        state.experiments = {
          ...state.experiments,
          ...experiments,
        };
        state.status = 'idle';
      })
      .addCase(createExperiment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createExperiment.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(createExperiment.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateExperiment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExperiment.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateExperiment.rejected, (state, action) => {
        state.status = 'idle';
      });
  },
});

export default experimentsSlice.reducer;
export {
  // action creators
  fetchExperiments,
  createExperiment,
  updateExperiment,

  // selectors
  selectAllExperiments,
  selectExperimentById,
};
