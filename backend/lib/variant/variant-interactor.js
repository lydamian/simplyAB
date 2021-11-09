const variant_model = require('./variant-model');
const C = require('../constants');
const LOG_TAG = '[variant-interactor]';

module.exports = {
  create_many: async (variants) => {
    const variant_percentage_sum = variants.reduce((sum, variant) => {
      return sum + variant.percent 
    }, 0);
      
    if (variant_percentage_sum != 100) {
      console.log(`${LOG_TAG} variant percentage ${variant_percentage_sum} is not 100`);
      throw new Error('variant percentages do not add up to 100');
    }

    const all_experiment_ids_same = variants.every(variant => {
      return variant.experiment_id === variants[0].experiment_id;
    });

    if (all_experiment_ids_same === false) {
      throw new Error('all experiment ids are not the same');
    }
  
    variant_model.delete_all(variants[0].experiment_id);
  
    return variant_model.create_many(variants);
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
