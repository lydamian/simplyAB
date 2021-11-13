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
        user_id,
      } = req.auth.credentials;
      const {
        project_id,
        title,
        description,
      } = req.payload;
      await project_interactor.update(user_id, project_id, title, description);
      return h.response({
        error: null,
        status_code: 'PROJECT_UPDATED_SUCCESSFULLY',
        description: 'successfully updated project',
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'PROJECT_UPDATED_ERROR',
        description: 'error updating project',
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
      const projects = await project_interactor.get(user_id);
      return h.response({
        error: null,
        status_code: 'PROJECT_GET_SUCCESS',
        description: `successfully got all projects for user: ${user_id}`,
        projects,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'PROJECT_GET_ERROR',
        description: 'project unsuccessfully gett\'d',
      }).code(201);
    }
  },
};
