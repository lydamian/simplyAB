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
        active,
        created_at,
      } = req.payload;
      const experiment_id = await experiment_interactor.create(
        project_id,
        key,
        title,
        description,
        traffic_allocation_percentage,
        active,
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
        active,
      } = req.payload;
      const success = await experiment_interactor.update(
        experiment_id,
        key,
        title,
        description,
        traffic_allocation_percentage,
        active,
      );
      return h.response({
        error: null,
        status_code: 'EXPERIMENT_UPDATED_SUCCESS',
        description: 'experiment successfully updated',
        success,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'EXPERIMENT_UPDATED_ERROR',
        description: 'experiment unsuccesfully updated',
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
        user_id,
      } = req.auth.credentials;
      const {
        project_id
      } = req.params;
      const experiments = await experiment_interactor.get(user_id, project_id);
      return h.response({
        error: null,
        status_code: 'EXPERIMENTS_FETCH_SUCCESS',
        description: `successfully fetched experiments for ${project_id}`,
        experiments
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'EXPERIMENTS_FETCH_ERROR',
        description: `unsuccessfully fetched experiments for ${project_id}`,
      }).code(201);
    }
  },
};
