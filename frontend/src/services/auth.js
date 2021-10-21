import axios from 'axios';
/**
 * gets authentication token if username, password,
 * and twoFactorAuthToken is valid.
 *
 * @param {String} username
 * @param {String} password
 * @param {String} twoFactorAuthToken
 * @returns {{token: String, username: String }} Object
}
 */
const getAuthToken = async (username, password, twoFactorAuthToken) => {
  console.log('[authService] getAuthToken:');
  try {
    const response = await axios.post('some_url', {
      username,
      password,
      twofactor: twoFactorAuthToken,
    });
    console.log('[authService] getAuthToken /api/admin/token response', JSON.stringify({ ...response.data }));
    return {
      ...response.data,
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      token: null,
    };
  }
};

export default {
  getAuthToken,
};
