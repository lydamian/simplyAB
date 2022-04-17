const user_interactor = require('./user-interactor');
const {
  StatusCodes: HTTP_STATUS_CODES,
} = require('http-status-codes');
const LOG_TAG = '[user-handler]';

module.exports = {
  get_variant_info: async (req, h) => {
    try {
      const {
        project_id,
       } = req.auth.credentials;
  
      const {
        user_id,
        experiment_key
      } = req.params;
  
      const {
        variant,
      } = await user_interactor.get_variant_info(project_id, experiment_key, user_id);
    
      return h.response({
        user_id,
        project_id,
        experiment_key,
        variant_key: variant?.variant_key,
        error: undefined,
      }).code(HTTP_STATUS_CODES.OK);
    } catch (error) {
      console.error(LOG_TAG, error, error.stack);
      return h.response({
        error: 'Something went wrong',
      }).code(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}