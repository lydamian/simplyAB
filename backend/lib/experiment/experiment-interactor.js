const jwt = require('jsonwebtoken');
const experiment_model = require('./experiment-model');
const C = require('../constants');

const LOG_TAG = 'auth-interactor';

module.exports = {
  create: async (
    user_id,
    title,
    description,
    active,
    created_at,
    last_updated_at,
  ) => {

    const experiment_id = await experiment_model.create(
      user_id,
      title,
      description,
      active,
      created_at,
      last_updated_at,
    );
    return experiment_id;
  },
  update: async (email_address, password) => {
  },
  delete: async (id) => {
    const num_deleted = await experiment_model.delete(id);
    return num_deleted > 0;
  },
  get: async (email_address, password) => {
  },
};
