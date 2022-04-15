const user_interactor = require('./user-interactor');

const {
	StatusCodes: HTTP_STATUS_CODES,
} = require('http-status-codes');

module.exports = {
  get_variant_info: async (request, h) => {
    const user_id = request.auth.credentials.user_id;

    const {
      project_key,
      experiment_key
    } = request.params;

    const {
      project,
      experiment,
      variant,
    } = await user_interactor.get_variant_info(user_id, project_key, experiment_key);
  
    return h.response({
      user_id,
      project_key,
      experiment_key,
      variant_key: variant.key
    }).code(HTTP_STATUS_CODES.OK);
  }
}