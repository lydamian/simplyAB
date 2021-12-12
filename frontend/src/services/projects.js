import axios from 'axios';
import constants from 'Constants';
import logger from 'utils/logger';
import helpers from 'utils/helpers';

const LOG_TAG = '[services/projects]';
/**
 * gets all experiments.
 *
 * @param {String} username
 * @param {String} password
 * @param {String} twoFactorAuthToken
 * @returns {{token: String, username: String }} Object
}
 */
const getProjects = async (user_id) => {
  try {
    const query_params = new URLSearchParams({
      user_id,
    }).toString();
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/project/get?${query_params}`,
      headers: {
        Authorization: helpers.getAuthToken()
      },
    });
    logger.info(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/get`,
      response.status,
      JSON.stringify(response.data),
    );
    return response;
  } catch (error) {
    logger.error(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/get`,
      error.response.data,
      error.response.status,
      error.message,
      error.stack
    );
    return error.response;
  }
};

const defaultExport = {
  getProjects,
}
export default getProjects;