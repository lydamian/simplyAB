const variant_interactor = require('./variant-interactor');

module.exports = {
  create_many: async (req, h) => {
    try {
      const {
        variants
      } = req.payload;

      const variant_ids = await variant_interactor.create_many(
        variants
      );

      return h.response({
        error: null,
        status_code: 'VARIANTS_CREATED_SUCCESS',
        description: 'variants successfully created',
        variant_ids,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'VARIANTS_CREATED_ERROR',
        description: 'variants unsuccessfully created',
      }).code(201);
    }
  },
  update: async (req, h) => {
    try {
      const {
        email_address,
        password,
      } = req.payload;
      const auth_token = await experiment_interactor.login(email_address, password);
      return h.response({
        error: null,
        status_code: 'USER_LOGIN_OK',
        description: 'user successfully logged in',
        auth_token,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'USER_LOGIN_ERROR',
        description: 'error logging in user',
      }).code(201);
    }
  },
  delete: async (req, h) => {
    try {
      const {
        id,
      } = req.payload;
      const result = experiment_interactor.delete(id);
      return h.response({
        error: null,
        status_code: 'EXPERIMENT_DELETED_SUCCESS',
        description: 'experiment successfully deleted',
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'EXPERIMENT_DELETED_ERROR',
        description: 'experiment unsucessfully deleted',
      }).code(201);
    }
  },
  get: async (req, h) => {
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
