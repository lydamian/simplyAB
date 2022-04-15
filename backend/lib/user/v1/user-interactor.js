const variant_model = require('../../variant/variant-model')

module.exports = {
  get_variant_info: async (user_id, project_key, experiment_key) => {
    variants = await variant_model.get_variants_by_key(user_id, project_key, experiment_key);
    console.log(JSON.stringify(variants));
    const variant='tbd';

    return {
      project_key,
      experiment_key,
      variant,
    }
  }
}