/* eslint-disable semi */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicantsService from 'services/applicants';

export const fetchApplicants = createAsyncThunk('applicants/fetchApplicants', async () => {
  const response = await applicantsService.getApplicants();
  return response;
});

const initialState = {
  status: 'idle',
  applicantsData: [],
};

export const applicantsSlice = createSlice({
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
      .addCase(fetchApplicants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        const { applicants } = action.payload;
        state.applicantsData = applicants
        state.status = 'idle';
      });
  },
});

export const getApplicants = (state) => state.applicants.applicantsData

// Action creators are generated for each case reducer function
export const { updateApplicantsData } = applicantsSlice.actions;

export default applicantsSlice.reducer;
