import axios from 'utils/request';
import constants from 'Constants';
import logger from 'utils/logger';
import helpers from 'utils/helpers';

const LOG_TAG = '[services/auth]';
/**
 * gets authentication token.
 *
 * @param {String} emailAddress
 * @param {String} password
 * @returns {{token: String, username: String }} Object
}
 */
const getLoginToken = async (emailAddress, password) => {
  try {
    const queryParams = new URLSearchParams({
      email_address: emailAddress,
      password,
    }).toString();
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/auth/login_token?${queryParams}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Registers a new user.
 *
 * @param {String} emailAddress
 * @param {String} password
 * @param {String} firstName
 * @param {String|null} lastName
 *
 * @returns {Promise.<Object>}
 */
const registerUser = async (
  emailAddress,
  password,
  firstName,
  lastName,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/auth/register`,
      data: {
        email_address: emailAddress,
        username: emailAddress,
        password,
        first_name: firstName,
        last_name: lastName,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Gets user info.
 *
 * @returns {Promise.<Object>}
 */
const getUser = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/auth/user`,
      headers: {
        Authorization: helpers.getLoginToken(),
      },
    });
    logger.info(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/auth/user`,
      response.status,
      JSON.stringify(response.data),
    );
    return response;
  } catch (error) {
    logger.error(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/auth/user`,
      error.response.data,
      error.response.status,
      error.message,
      error.stack,
    );
    return error.response;
  }
};
const defaultExport = {
  registerUser,
  getLoginToken,
  getUser,
};
export default defaultExport;
