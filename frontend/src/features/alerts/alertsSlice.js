/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import ALERT_TYPES from 'features/alerts/ALERT_TYPES';

const initialState = [];

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert(alerts, action) {
      const {
        message,
        type,
      } = action.payload;
      alerts.push({
        id: alerts.length,
        message,
        type: ALERT_TYPES[type],
      });
    },
    clearAlert: (alerts, action) => alerts.filter((alert) => alert.id !== action.payload),
  },
});

const getAllAlerts = (state) => state.alerts;

export {
  getAllAlerts,
};

export const { addAlert, clearAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
