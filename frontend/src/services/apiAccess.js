import axios from 'utils/request';
import constants from 'Constants';
import helpers from 'utils/helpers';

/**
 * Creates an API Access token
 *
 * @param {Number|null} experimentId
 *
 * @returns {Promise.<Object>} Object
}
 */
const createAPIToken = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/auth/api_token`,
      headers: {
        Authorization: helpers.getLoginToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Gets all api access tokens
 *
 *
 * @returns {Promise.<Object>}
 */
const getAPITokens = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/auth/api_token`,
      data: {},
      headers: {
        Authorization: helpers.getLoginToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Deletes specified API token for a user
 *
 *
 * @returns {Promise.<Object>}
 */
const deleteAPIToken = async (apiToken) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/auth/api_token`,
      data: {
        api_token: apiToken,
      },
      headers: {
        Authorization: helpers.getLoginToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export default {
  createAPIToken,
  getAPITokens,
  deleteAPIToken,
};
