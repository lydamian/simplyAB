import apiAccessService from 'services/apiAccess';
import logger from 'utils/logger';

const LOG_TAG = '[apiAuthController]';

const apiAuthController = {
  /**
   * Get an APIAuthToken for a userId.
   *
   * @param {Number} user_id
   *
   * @returns {Promise.<Boolean>} true if successful, false otherwise
   */
  createAPIToken: async () => {
    try {
      const response = await apiAccessService.createAPIToken();

      const {
        statusCode,
        error,
        description,
        apiToken,
      } = response.data;

      logger.info(
        `${LOG_TAG} createAPIToken`,
        `HTTP_STATUS: ${response.status}`,
        `error: ${error}`,
        `status_code: ${statusCode}`,
        `description: ${description}`,
        `apiToken: ${apiToken}`,
      );

      return apiToken != null;
    } catch (error) {
      logger.error(`${LOG_TAG} createAPIToken ERROR:`, error.message, error.stack);
      return false;
    }
  },

  /**
   * Gets all the API Tokens for user
   *
   * @returns {Promise.Array.<<Object>>} apiTokens
   */
  getAPITokens: async () => {
    try {
      const response = await apiAccessService.getAPITokens();

      const {
        statusCode,
        error,
        description,
        apiTokens,
      } = response.data;

      logger.info(
        `${LOG_TAG} getAPITokens`,
        `HTTP_STATUS: ${response.status}`,
        `error: ${error}`,
        `status_code: ${statusCode}`,
        `description: ${description}`,
        `apiTokens: ${apiTokens}`,
      );

      return apiTokens;
    } catch (error) {
      logger.error(`${LOG_TAG} getAPITokens ERROR:`, error.message, error.stack);
      return [];
    }
  },

  /**
   * Deletes a api token for a user
   *
   * @param {String} apiToken
   */
  deleteAPIToken: async (apiToken) => {
    try {
      const response = await apiAccessService.deleteAPIToken(apiToken);

      const {
        statusCode,
        error,
        description,
        success,
      } = response.data;

      logger.info(
        `${LOG_TAG} getAPITokens`,
        `HTTP_STATUS: ${response.status}`,
        `error: ${error}`,
        `status_code: ${statusCode}`,
        `description: ${description}`,
        `success: ${success}`,
      );

      return success;
    } catch (error) {
      logger.error(`${LOG_TAG} getAPITokens ERROR:`, error.message, error.stack);
      return [];
    }
  },
};

export default apiAuthController;
