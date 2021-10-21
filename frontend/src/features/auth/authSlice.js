/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import authService from 'services/auth';
import store from 'state/store';
import { addAlert } from 'features/alerts/alertsSlice';

const initialState = {
  status: 'idle',
  isAuthenticated: false,
  user: {
    username: null,
  },
};

// Thunk functions
const login = createAsyncThunk('auth/login', async ({ username, password, twoFactorAuthToken }) => {
  const {
    success,
    error,
    token,
    username: _username,
  } = await authService.getAuthToken(username, password, twoFactorAuthToken);

  if (success === false) {
    store.dispatch(addAlert({
      message: 'Unsuccesfully logged in user',
      type: 'DANGER',
    }));
  }
  if (success === true) {
    localStorage.setItem('X-Raya-Token', token);
    store.dispatch(addAlert({
      message: 'Succesfully logged in user',
      type: 'SUCCESS',
    }));
  }

  return {
    isAuthenticated: success,
    username: _username,
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: {
      reducer(state) {
        Object.assign(state, initialState);
      },
    },
    logout: {
      reducer(state) {
        Object.assign(state, initialState);
        localStorage.removeItem('X-Raya-Token');
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const {
          isAuthenticated,
          username,
        } = action.payload;

        state.isAuthenticated = isAuthenticated;
        state.user.username = username;
        state.status = 'idle';
      });
  },
});

const isLoggedIn = (state) => state.auth.isAuthenticated;
const getStatus = (state) => state.auth.status;

const getAuthToken = () => {
  const authToken = localStorage.get('X-Raya-Token');
  if (authToken != null) {
    return true;
  }
  return false;
};

export {
  isLoggedIn,
  getStatus,
  getAuthToken,
  login,
};

// Action creators are generated for each case reducer function
export const {
  reset,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
