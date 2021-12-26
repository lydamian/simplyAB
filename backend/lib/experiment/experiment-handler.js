const experiment_interactor = require('./experiment-interactor');
const { UNIQUE_VIOLATION } = require('pg-error-constants')

module.exports = {
  create: async (req, h) => {
    try {
      const {
        project_id,
        key,
        title,
        description,
        traffic_allocation_percentage,
        status,
        created_at,
      } = req.payload;
      const experiment_id = await experiment_interactor.create(
        project_id,
        key,
        title,
        description,
        traffic_allocation_percentage,
        status,
        created_at,
      );
      return h.response({
        error: null,
        status_code: 'EXPERIMENT_CREATED_SUCCESS',
        description: 'experiment successfully created',
        experiment_id,
      }).code(201);
    } catch (error) {
      const response = {
        error: error.message,
        status_code: 'EXPERIMENT_CREATED_ERROR',
        description: 'experiment unsuccessfully created',
      };

      if (UNIQUE_VIOLATION === error.code) {
        response.description = 'experiment already exists';
      }
      return h.response(response).code(500);
    }
  },
  update: async (req, h) => {
    try {
      const {
        user_id,
      } = req.auth.credentials;
      const {
        experiment_id,
        key,
        title,
        description,
        traffic_allocation_percentage,
        status,
      } = req.payload;
      const success = await experiment_interactor.update(
        user_id,
        experiment_id,
        key,
        title,
        description,
        traffic_allocation_percentage,
        status,
      );
      return h.response({
        error: null,
        status_code: 'EXPERIMENT_UPDATED_SUCCESS',
        description: 'experiment successfully updated',
        success,
      }).code(201);
    } catch (error) {
      console.error(error, error.stack);
      return h.response({
        error: error.message,
        status_code: 'EXPERIMENT_UPDATED_ERROR',
        description: 'experiment unsuccesfully updated',
      }).code(400);
    }
  },
  delete: async (req, h) => {
    try {
      const {
        user_id,
      } = req.auth.credentials;
      const {
        experiment_id,
      } = req.payload;
      const success = await experiment_interactor.delete(user_id, experiment_id);
      if (success === false) {
        throw new Error(`Failed to delete experiment for user: ${user_id} and experiment: ${experiment_id}`);
      }
      return h.response({
        error: null,
        status_code: 'EXPERIMENT_DELETED_SUCCESS',
        description: 'experiment successfully deleted',
      }).code(201);
    } catch (error) {
      console.error(error, error.stack);
      return h.response({
        error: error.message,
        status_code: 'EXPERIMENT_DELETED_ERROR',
        description: 'experiment unsucessfully deleted',
      }).code(400);
    }
  },
  get: async (req, h) => {
    const {
      user_id,
    } = req.auth.credentials;
    const {
      project_id,
    } = req.params;
    try {
      const experiments = await experiment_interactor.get(user_id, project_id);
      return h.response({
        error: null,
        status_code: 'EXPERIMENTS_FETCH_SUCCESS',
        description: `successfully fetched experiments for ${project_id}`,
        experiments
      }).code(201);
    } catch (error) {
      console.error(error, error.stack);
      return h.response({
        error: error.message,
        status_code: 'EXPERIMENTS_FETCH_ERROR',
        description: `unsuccessfully fetched experiments for ${project_id}`,
      }).code(400);
    }
  },
};
