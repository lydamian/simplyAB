/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import logger from 'utils/logger';

const LOG_TAG = '[alertsSlice]';
const THREE_SECONDS_MS = 3000;
const initialState = [];
const ALERT_TYPES = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  DANGER: 'DANGER',
};

// thunks
const addAlert = createAsyncThunk('alerts/addAlert', async ({
  message,
  type,
}, { dispatch, rejectWithValue }) => {
  try {
    const alertId = nanoid();
    setTimeout(() => {
      dispatch(clearAlert(alertId));
    }, THREE_SECONDS_MS); // clear the alert automatically after 3 seconds
    return {
      alertId,
      message,
      type,
    };
  } catch (error) {
    logger.error(LOG_TAG, error.message, error.stack);
    return rejectWithValue(error.response.data);
  }
});

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    clearAlert: (alerts, action) => alerts.filter((alert) => alert.id !== action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAlert.pending, (alerts, action) => {
        // do nothing
      })
      .addCase(addAlert.fulfilled, (alerts, action) => {
        const {
          alertId,
          message,
          type,
        } = action.payload;
        alerts.push({
          id: alertId,
          message,
          type: ALERT_TYPES[type],
        });
      });
  },
});

// action creators are generated for each case reducer function
const { clearAlert } = alertsSlice.actions;
const selectAllAlerts = (state) => state.alerts;

export default alertsSlice.reducer;
export {
  clearAlert,
  selectAllAlerts,
  // my thunks
  addAlert,

  // types
  ALERT_TYPES,
};
