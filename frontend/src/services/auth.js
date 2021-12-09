import axios from 'axios';
import constants from 'Constants';
import logger from 'utils/logger';

const LOG_TAG = '[services/auth.js]';
/**
 * gets authentication token.
 *
 * @param {String} emailAddress
 * @param {String} password
 * @returns {{token: String, username: String }} Object
}
 */
const getAuthToken = async (emailAddress, password) => {
  try {
    const query_params = new URLSearchParams({
      email_address: emailAddress,
      password: password,
    }).toString();
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/auth/token?${query_params}`,
    });
    logger.info(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/auth/token`,
      response.status,
      JSON.stringify(response.data),
    );
    return response;
  } catch (error) {
    logger.error(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/auth/token`,
      error.message,
      error.stack
    );
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
        password: password,
        first_name: firstName,
        last_name: lastName,
      }
    });
    logger.info(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/auth/register`,
      response.status,
      JSON.stringify(response.data),
    );
    return response;
  } catch (error) {
    logger.error(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/auth/register`,
      error.message,
      error.stack
    )
  }
}

export default {
  getAuthToken,
  registerUser,
};
