const auth_interactor = require('./auth-interactor');
const LOG_TAG = '[auth-handler]';

module.exports = {
  register: async (req, h) => {
    try {
      const {
        email_address,
        username,
        password,
        first_name,
        last_name,
        user_type
      } = req.payload;
      const user_id = await auth_interactor.register(
        email_address,
        username,
        password,
        first_name,
        last_name,
        user_type
      );

      return h.response({
        error: null,
        status_code: 'USER_REGISTERED_OK',
        description: 'user registered successfully',
        user_id,
      }).code(201);
    } catch (error) {
      console.error(`${LOG_TAG} ${error} ${error.stack}`);
      return h.response({
        error: error.message,
        status_code: 'USER_REGISTERED_ERROR',
        description: 'error registering user',
      }).code(400);
    }
  },
  get_token: async (req, h) => {
    try {
      const {
        email_address,
        password,
      } = req.query;

      const auth_token = await auth_interactor.get_auth_token(
        email_address,
        password,
      );

      return h.response({
        error: null,
        status_code: 'GET_AUTH_TOKEN_SUCCESS',
        description: 'user successfully received auth token',
        auth_token,
      }).code(201);
    } catch (error) {
      console.log(LOG_TAG, error.message, error.stack);
      return h.response({
        error: error.message,
        status_code: 'GET_AUTH_TOKEN_ERROR',
        description: 'user unsuccesfully received auth token',
      }).code(400);
    }
  },

  get_user: async (req, h) => {
    try {
      const {
        user_id,
      } = req.auth.credentials;

      const user = await auth_interactor.get_user(user_id);

      return h.response({
        error: null,
        status_code: 'USER_GET_SUCCESS',
        description: 'successfully retrieved user data',
        user,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'USER_GET_ERROR',
        description: 'unsucessfully retrieved user data',
      }).code(400);
    }
  },

  is_authenticated: async (req, h) => {
    try {
      const {
        email_address,
      } = req.auth.credentials;
      console.log(req.auth.credentials);
      return h.response({
        error: null,
        status_code: 'USER_AUTHENTICATED_TRUE',
        description: 'valid authentication token',
        user: {
          email_address,
        },
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'USER_AUTHENTICATED_FALSE',
        description: 'invalid authentication token',
      }).code(400);
    }
  },
};
