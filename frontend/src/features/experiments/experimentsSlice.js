/* eslint-disable semi */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import experimentsService from 'services/experiments';

export const getExperiments = createAsyncThunk('applicants/getExperiments', async () => {
  const response = await applicantsService.getApplicants();
  return response;
});

const initialState = {
  status: 'idle',
  applicantsData: [],
};

export const experimentsSlice = createSlice({
  name: 'applicants',
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
      .addCase(getExperiments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getExperiments.fulfilled, (state, action) => {
        const { applicants } = action.payload;
        state.applicantsData = applicants
        state.status = 'idle';
      });
  },
});

export const getExperiments = (state) => state.experiments

// Action creators are generated for each case reducer function
export const { updateExperiments } = experimentsSlice.actions;

export default experimentsSlice.reducer;
