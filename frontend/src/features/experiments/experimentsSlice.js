/* eslint-disable semi */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import experimentsService from 'services/experiments';

export const fetchExperiments = createAsyncThunk('applicants/fetchExperiments', async () => {
  const response = await experimentsService.getExperiments();
  return response;
});

const initialState = {
  status: 'idle',
  experiments: [],
};

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
        const { experiments } = action.payload;
        state.experiments = experiments
        state.status = 'idle';
      });
  },
});

export const getExperiments = (state) => state.experiments.experiments

// Action creators are generated for each case reducer function
export const { updateExperiments } = experimentsSlice.actions;

export default experimentsSlice.reducer;
