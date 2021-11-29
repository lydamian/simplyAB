const jwt = require('jsonwebtoken');
const experiment_model = require('./experiment-model');
const C = require('../constants');

const LOG_TAG = 'auth-interactor';

module.exports = {
  create: async (
    project_id,
    key,
    title,
    description,
    traffic_allocation_percentage,
    active,
    created_at
  ) => {
    const experiment_id = await experiment_model.create(
      project_id,
      key,
      title,
      description,
      traffic_allocation_percentage,
      active,
      created_at
    );
    return experiment_id;
  },
  update: async (
    experiment_id,
    key,
    title,
    description,
    traffic_allocation_percentage,
    active,
  ) => {
    const success = await experiment_model.update(
      experiment_id,
      key,
      title,
      description,
      traffic_allocation_percentage,
      active
    );
    return success;
  },
  delete: async (id) => {
    const num_deleted = await experiment_model.delete(id);
    return num_deleted > 0;
  },
  get: async (user_id, project_id) => {
    return experiment_model.get(user_id, project_id);
  },
};
