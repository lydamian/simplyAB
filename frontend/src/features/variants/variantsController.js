import variantsService from 'services/variants';
import logger from 'utils/logger';

const LOG_TAG = '[variantsController]';

const variantsController = {
  /**
   * Fetches variants given an experimentId.
   *
   * @param {Number} experimentId
   *
   * @returns {Promise.<Array.<Object>}
   */
  fetchVariants: async (experimentId) => {
    try {
      const response = await variantsService.getVariants(experimentId);
      const {
        error,
        statusCode,
        description,
        variants,
      } = response.data;

      logger.info(
        `${LOG_TAG} createVariants`,
        `HTTP_STATUS: ${response.status}`,
        `error: ${error}`,
        `status_code: ${statusCode}`,
        `description: ${description}`,
        `variants: ${JSON.stringify(variants)}`,
      );

      return variants;
    } catch (error) {
      logger.error(`${LOG_TAG} createVariants ERROR:`, error.message, error.stack);
      return [];
    }
  },

  /**
   * Create variants
   *
   * @param {Number} experimentId
   * @param {Array.<Object>} _variants
   *
   * @returns {Promise.<Boolean|null>} success true or false
   */
  createVariants: async (experimentId, _variants) => {
    try {
      const variants = _variants.map((variant) => ({
        key: variant.key,
        title: variant.title,
        traffic_allocation_percentage: variant.trafficAllocationPercentage,
        created_at: variant.createdAt,
        last_updated_at: variant.lastUpdatedAt,
      }));
      const response = await variantsService.createVariants(experimentId, variants);
      const {
        error,
        statusCode,
        description,
        variantIds,
      } = response.data;

      logger.info(
        `${LOG_TAG} createVariants`,
        `HTTP_STATUS: ${response.status}`,
        `error: ${error}`,
        `status_code: ${statusCode}`,
        `description: ${description}`,
        `variantIds: ${variantIds}`,
      );

      const success = typeof variantIds === 'object';
      return success;
    } catch (error) {
      logger.error(`${LOG_TAG} createVariants ERROR:`, error.message, error.stack);
      return false;
    }
  },
};

export default variantsController;
