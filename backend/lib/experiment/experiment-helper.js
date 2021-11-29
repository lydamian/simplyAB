
const experiment_model = require('./experiment-model');
module.exports = {
  /**
   * Validates whether a user owns an experiment.
   *
   * @param {Number} user_id 
   * @param {Number} experiment_id
   *
   * @returns {Promise.<Boolean>}
   * @throws an error if user does not own experiment.
   */
  validate_experiment_ownership: async (user_id, experiment_id) => {
    const experiment_owner = await experiment_model.get_owner(experiment_id);
    if (experiment_owner != user_id) {
      throw new Error(`User: ${user_id} is not experiment: ${experiment_id} owner`);
    }
    return true;
  }
}