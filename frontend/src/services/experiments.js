import axios from 'axios';
import faker from 'faker';
import _ from 'lodash';
/**
 * gets all experiments.
 *
 * @param {String} username
 * @param {String} password
 * @param {String} twoFactorAuthToken
 * @returns {{token: String, username: String }} Object
}
 */
const getExperiments = async (username, password, twoFactorAuthToken) => {
  return {
    experiments: _.range(5).map(() => ({
      id: faker.datatype.uuid(),
      title: `${faker.random.word()} Experiment `,
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean() ? 'true': 'false',
      created_at: faker.datatype.datetime().toISOString(),
      last_updated_at: faker.datatype.datetime().toISOString(),
    }))
  };
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
  getExperiments,
};
