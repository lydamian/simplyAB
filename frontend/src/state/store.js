import {
  configureStore,
  combineReducers,
  createAction,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from 'features/auth/authSlice';
import projectsReducer from '../features/projects/projectsSlice';
import experimentsReducer from '../features/experiments/experimentsSlice';
import variantsReducer from '../features/variants/variantsSlice';
import alertsReducer from '../features/alerts/alertsSlice';

const LOGOUT_REQUEST = 'root/logout';
const logout = createAction(LOGOUT_REQUEST);

const persistConfig = {
  key: 'root',
  storage,
};

const appReducer = combineReducers({
  /** Your app's top level reducers */
  projects: projectsReducer,
  experiments: experimentsReducer,
  variants: variantsReducer,
  auth: authReducer,
  alerts: alertsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root');

    // remove auth token from localStorage
    localStorage.removeItem('simply_ab_login_token');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;

export {
  logout,
};
