import axios from 'utils/request';
import constants from 'Constants';
import helpers from 'utils/helpers';

/**
 * Gets all variants given an experimentId.
 *
 * @param {Number|null} experimentId
 *
 * @returns {Promise.<Object>} Object
}
 */
const getVariants = async (experimentId) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/variant/get/${experimentId}`,
      headers: {
        Authorization: helpers.getAuthToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Creates variants for an experimentId.
 *
 * @param {Number} experimentId
 * @param {Array.<Object>} variants
 *
 * @returns {Promise.<Object>}
 */
const createVariants = async (experimentId, variants) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/variant/upsert`,
      data: {
        experiment_id: experimentId,
        variants,
      },
      headers: {
        Authorization: helpers.getAuthToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export default {
  getVariants,
  createVariants,
};
