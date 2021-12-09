const experiment_model = require('./experiment-model');
const experiment_helper = require('./experiment-helper');
const project_helper = require('../project/project-helper');
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
    user_id,
    experiment_id,
    key,
    title,
    description,
    traffic_allocation_percentage,
    active,
  ) => {
    await experiment_helper.validate_experiment_ownership(user_id, experiment_id);
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
  /**
   * Deletes an experiment given an experiment_id.
   *
   * @param {Number} user_id 
   * @param {Number} experiment_id
   *
   * @returns {Promise.<Boolean>}
   * @throws an error
   */
  delete: async (user_id, experiment_id) => {
    await experiment_helper.validate_experiment_ownership(user_id, experiment_id);
    const num_deleted = await experiment_model.delete(experiment_id);
    return num_deleted > 0;
  },
  get: async (user_id, project_id) => {
    await project_helper.validate_project_ownership(user_id, project_id);
    return experiment_model.get(user_id, project_id);
  },
};
