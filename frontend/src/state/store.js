import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import projectsReducer from '../features/projects/projectsSlice';
import experimentsReducer from '../features/experiments/experimentsSlice';
import alertsReducer from '../features/alerts/alertsSlice';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    experiments: experimentsReducer,
    auth: authReducer,
    alerts: alertsReducer,
  },
});

export default store;
