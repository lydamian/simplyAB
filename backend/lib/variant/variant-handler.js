const variant_interactor = require('./variant-interactor');

module.exports = {
  upsert: async (req, h) => {
    try {
      const {
        experiment_id,
        variants
      } = req.payload;

      const variant_ids = await variant_interactor.upsert(
        experiment_id,
        variants
      );

      return h.response({
        error: null,
        status_code: 'VARIANTS_CREATED_SUCCESS',
        description: 'variants successfully created',
        variant_ids,
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'VARIANTS_CREATED_ERROR',
        description: 'variants unsuccessfully created',
      }).code(201);
    }
  },

  get: async (req, h) => {
    try {
      const {
        user_id,
      } = req.auth.credentials;
      const {
        experiment_id
      } = req.params;
      const variants = await variant_interactor.get(experiment_id);
      return h.response({
        error: null,
        status_code: 'VARIANTS_FETCH_SUCCESS',
        description: `successfuly fetched all variants for experiment: ${experiment_id}`,
        variants
      }).code(201);
    } catch (error) {
      return h.response({
        error: error.message,
        status_code: 'VARIANTS_FETCH_ERROR',
        description: 'unsuccessfuly fetched all variants for experiment: ${experiment_id}',
      }).code(201);
    }
  },
};
