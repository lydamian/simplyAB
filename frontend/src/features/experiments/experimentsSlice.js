/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import experimentsService from 'services/experiments';
import logger from 'utils/logger';

const LOG_TAG = '[experimentsSlice]';

const initialState = {
  status: 'idle',
  experiments: [],
};

export const fetchExperiments = createAsyncThunk('experiments/fetchExperiments', async (
  payload,
  {
    rejectWithValue,
  },
) => {
  try {
    const {
      projectId,
    } = payload;
    const response = await experimentsService.getExperiments(projectId);

    const {
      error,
      statusCode,
      description,
      experiments,
    } = response.data;

    logger.info(
      `${LOG_TAG} fetchExperiments`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `experiments: ${JSON.stringify(experiments)}`,
    );

    if (error != null) {
      return initialState.experiments;
    }
    return experiments;
  } catch (error) {
    logger.error(`${LOG_TAG} fetchExperiments ERROR:`, error.message, error.stack);
    rejectWithValue(initialState.experiments);
  }
});

export const experimentsSlice = createSlice({
  name: 'experiments',
  initialState,
  reducers: {
    updateApplicantsData(state, action) {
      const applicantsData = action.payload;
      state.applicantsData = [
        ...applicantsData,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiments.fulfilled, (state, action) => {
        const experiments = action.payload;
        state.experiments = experiments;
        state.status = 'idle';
      })
      .addCase(fetchExperiments.rejected, (state, action) => {
        const experiments = action.payload;
        state.experiments = experiments;
        state.status = 'idle';
      });
  },
});

export const getExperiments = (state) => state.experiments.experiments;

// Action creators are generated for each case reducer function
export const { updateExperiments } = experimentsSlice.actions;

export default experimentsSlice.reducer;
