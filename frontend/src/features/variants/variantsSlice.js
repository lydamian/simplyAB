/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import variantsService from 'services/variants';
import logger from 'utils/logger';

const LOG_TAG = '[variantsSlice]';

const initialState = {
  status: 'idle',
  variants: [],
};

export const fetchVariants = createAsyncThunk('variants/fetchVariants', async (
  payload,
  {
    rejectWithValue,
  },
) => {
  try {
    const experimentId = payload?.experimentId;
    const response = await variantsService.getVariants(experimentId);

    const {
      error,
      statusCode,
      description,
      variants,
    } = response.data;

    logger.info(
      `${LOG_TAG} fetchVariants`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `variants: ${JSON.stringify(variants)}`,
    );

    if (error != null) {
      return initialState.variants;
    }
    return variants;
  } catch (error) {
    logger.error(`${LOG_TAG} fetchVariants ERROR:`, error.message, error.stack);
    rejectWithValue(initialState.variants);
  }
});

export const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVariants.fulfilled, (state, action) => {
        const variants = action.payload;
        state.variants = variants;
        state.status = 'idle';
      })
      .addCase(fetchVariants.rejected, (state, action) => {
        const variants = action.payload;
        state.variants = variants;
        state.status = 'idle';
      });
  },
});

export const getVariants = (state) => state.variants.variants;

// Action creators are generated for each case reducer function
// export const { updateExperiments } = variantsSlice.actions;

export default variantsSlice.reducer;
