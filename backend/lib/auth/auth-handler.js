const auth_interactor = require('./auth-interactor');

module.exports = {
  register: async (req, h) => {
    try {
      const user_id = await auth_interactor.register(req.payload);
      return h.response({
        error: null,
        status_code: 'USER_REGISTERED_OK',
        description: 'user registered successfully',
        user_id,
      }).code(201);
    } catch (error) {
      console.error(`[register] ${error} ${error.stack}`);
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
        description: 'user successfully received auth token in',
        auth_token,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'GET_AUTH_TOKEN_ERROR',
        description: 'user unsuccesfully received auth token',
      }).code(201);
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
      }).code(201);
    }
  },
};
