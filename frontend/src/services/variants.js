import axios from 'utils/request';
import constants from 'Constants';
import helpers from 'utils/helpers';

/**
 * Gets all variants for a user or a experimentId optionally.
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

export default {
  getVariants,
};
