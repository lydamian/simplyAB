const variant_model = require('./variant-model');
const C = require('../constants');
const LOG_TAG = '[variant-interactor]';
const MAX_VARIANT_SUM = 100;

module.exports = {
  /**
   * Upserts many variants for an experiment.
   *
   * @param {Number} experiment_id
   * @param {Object} variants
   * 
   * @returns {Promise.<Array.<Object>>} 
   */
   upsert: async (experiment_id, variants) => {
    const variant_percentage_sum = variants.reduce((sum, variant) => {
      return sum + variant.percent 
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
   * @param {Number} experiment_id
   * 
   * @returns {Promise.<Array.<Object>>} 
   */
  get: async (experiment_id) => {
    return variant_model.get(experiment_id);
  },
};
