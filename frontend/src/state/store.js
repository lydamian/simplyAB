import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import experimentReducer from '../features/experiments/experimentsSlice';
import alertsReducer from '../features/alerts/alertsSlice';

const store = configureStore({
  reducer: {
    experiments: experimentReducer,
    auth: authReducer,
    alerts: alertsReducer,
  },
});

export default store;
