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
    status,
    created_at
  ) => {
    const experiment_id = await experiment_model.create(
      project_id,
      key,
      title,
      description,
      traffic_allocation_percentage,
      status,
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
    status,
  ) => {
    await experiment_helper.validate_experiment_ownership(user_id, experiment_id);
    const success = await experiment_model.update(
      experiment_id,
      key,
      title,
      description,
      traffic_allocation_percentage,
      status
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
  /**
   * Gets all experiments for a user.
   * 
   * @param {Number} user_id 
   * @param {Number|null} project_id (optional)
   * @param {Number|null} experiment_id (optional)
   */
  get: async (user_id, project_id, experiment_id) => {
    if (project_id != null) {
      await project_helper.validate_project_ownership(
        user_id,
        project_id,
      );
    }
    return experiment_model.get(
      user_id,
      project_id,
      experiment_id
    );
  },
};
