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
import logger from 'utils/logger';

const LOG_TAG = '[authSlice]';

const initialState = {
  status: 'idle',
  isAuthenticated: false,
  user: null,
};

// Thunk functions (async actions creator factories)
const getUser = createAsyncThunk('auth/user', async () => {
  try {
    const response = await authService.getUser();

    const {
      error,
      status_code: statusCode,
      description,
      user,
    } = response.data;

    logger.info(
      `${LOG_TAG} register`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `user: ${JSON.stringify(user)}`,
    );
    return {
      user,
    };
  } catch (error) {
    logger.error(`${LOG_TAG} getUser ERROR:`, error.message, error.stack);
    return {
      user: initialState.user,
    };
  }
});

const login = createAsyncThunk('auth/login', async ({ emailAddress, password }) => {
  try {
    const response = await authService.getAuthToken(emailAddress, password);

    const {
      status_code: statusCode,
      error,
      description,
      auth_token: authToken,
    } = response.data;

    logger.info(
      `${LOG_TAG} login`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `auth_token: ${authToken}`,
    );

    if (error != null) {
      await store.dispatch(addAlert({
        message: 'Unsuccesfully logged in user',
        type: 'DANGER',
      }));
      return {
        isAuthenticated: false,
      };
    }

    localStorage.setItem('simply_ab_auth_token', authToken);
    await store.dispatch(addAlert({
      message: 'Succesfully logged in user',
      type: 'SUCCESS',
    }));

    store.dispatch(getUser());

    return {
      isAuthenticated: true,
    };
  } catch (error) {
    logger.error(`${LOG_TAG} login ERROR:`, error.message, error.stack);
    return {
      isAuthenticated: initialState.isAuthenticated,
    };
  }
});

const register = createAsyncThunk('auth/register', async ({
  emailAddress,
  password,
  firstName,
  lastName,
}) => {
  try {
    const response = await authService.registerUser(
      emailAddress,
      password,
      firstName,
      lastName,
    );

    const {
      error,
      status_code: statusCode,
      description,
      user_id: userId,
    } = response.data;

    logger.info(
      `${LOG_TAG} register`,
      `HTTP_STATUS: ${response.status}`,
      `error: ${error}`,
      `status_code: ${statusCode}`,
      `description: ${description}`,
      `user_id: ${userId}`,
    );

    if (error != null) {
      store.dispatch(addAlert({
        message: 'Something went wrong',
        type: 'DANGER',
      }));
      return;
    }

    store.dispatch(addAlert({
      message: 'Succesfully registered',
      type: 'SUCCESS',
    }));

    store.dispatch(login({
      emailAddress,
      password,
    }));

    return;
  } catch (error) {
    logger.error(`${LOG_TAG} register ERROR:`, error.message, error.stack);
  }
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
        localStorage.removeItem('simply_ab_auth_token');
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
        } = action.payload;

        state.isAuthenticated = isAuthenticated;
        state.status = 'idle';
      })
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const {
          user,
        } = action.payload;
        state.user = user;
        state.status = 'idle';
      });
  },
});

const isAuthenticated = (state) => state.auth.isAuthenticated;
const getStatus = (state) => state.auth.status;

export {
  isAuthenticated,
  getStatus,
  login,
  register,
};

// Action creators are generated for each case reducer function
export const {
  reset,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
