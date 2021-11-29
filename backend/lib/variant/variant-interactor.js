const variant_model = require('./variant-model');
const experiment_helper = require('../experiment/experiment-helper');
const C = require('../constants');
const LOG_TAG = '[variant-interactor]';
const MAX_VARIANT_SUM = 100;

module.exports = {
  /**
   * Upserts many variants for an experiment.
   *
   * @param {Number} user_id
   * @param {Number} experiment_id
   * @param {Object} variants
   * 
   * @returns {Promise.<Array.<Object>>} 
   */
   upsert: async (user_id, experiment_id, variants) => {
    await experiment_helper.validate_experiment_ownership(user_id, experiment_id);
    const variant_percentage_sum = variants.reduce((sum, variant) => {
      return sum + variant.traffic_allocation_percentage; 
    }, 0);
      
    if (variant_percentage_sum > MAX_VARIANT_SUM) {
      console.error(`${LOG_TAG} variant percentage ${variant_percentage_sum} is greater than ${MAX_VARIANT_SUM}`);
      throw new Error('variant percentages greater than MAX_VARIANT_SUM');
    }

    variant_model.delete_all(experiment_id);
    return variant_model.upsert(experiment_id, variants);
  },

  /**
   * gets all variants given an experiment_id.
   * 
   * @param {Number} user_id
   * @param {Number} experiment_id
   * 
   * @returns {Promise.<Array.<Object>>} 
   */
  get: async (user_id, experiment_id) => {
    await experiment_helper.validate_experiment_ownership(user_id, experiment_id);
    return variant_model.get(user_id, experiment_id);
  },
};
