/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import variantsService from 'services/variants';
import logger from 'utils/logger';

const LOG_TAG = '[variantsSlice]';

const initialState = {
  status: 'idle',
  variants: {},
};

// thunks
const fetchVariants = createAsyncThunk('variants/fetchVariants', async (
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

    return _.chain(variants ?? [])
      .keyBy('experimentId')
      .value();
  } catch (error) {
    logger.error(`${LOG_TAG} fetchVariants ERROR:`, error.message, error.stack);
    rejectWithValue(initialState.variants);
  }
});

const updateVariants = createAsyncThunk('variants/updateVariants', async (
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

// selectors
const selectVariantsByExperimentId = (state, experimentId) => (
  state.variants.variants[experimentId] ?? []
);

const variantsSlice = createSlice({
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
      })
      .addCase(updateVariants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateVariants.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateVariants.rejected, (state, action) => {
        state.status = 'idle';
      });
  },
});

// Action creators are generated for each case reducer function
// export const { updateExperiments } = variantsSlice.actions;

export default variantsSlice.reducer;
export {
  // action creators
  fetchVariants,
  updateVariants,

  // selectors
  selectVariantsByExperimentId,
};
