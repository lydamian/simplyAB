const project_interactor = require('./project-interactor');

module.exports = {
  create: async (req, h) => {
    try {
      const {
        title,
        description,
      } = req.payload;
      const user_id = req.auth.credentials.user_id;
      const project_id = await project_interactor.create(
        user_id,
        title,
        description,
      );
      return h.response({
        error: null,
        status_code: 'project_CREATED_SUCCESS',
        description: 'project successfully created',
        project_id,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'project_CREATED_ERROR',
        description: 'project unsuccessfully created',
      }).code(201);
    }
  },
  update: async (req, h) => {
    try {
      const {
        project_id,
        title,
        description,
      } = req.payload;
      const auth_token = await project_interactor.update(project_id, title, description);
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
        project_id,
      } = req.payload;
      const result = project_interactor.delete(project_id);
      return h.response({
        error: null,
        status_code: 'project_DELETED_SUCCESS',
        description: 'project successfully deleted',
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'project_DELETED_ERROR',
        description: 'project unsucessfully deleted',
      }).code(201);
    }
  },
  get: async (req, h) => {
    try {
      const {
        user_id,
      } = req.auth.credentials;
      const projects = project_interactor.get(user_id);
      return h.response({
        error: null,
        status_code: 'USER_AUTHENTICATED_TRUE',
        description: 'valid authentication token',
        projects,
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
