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
const getExperiments = async () => ({
  experiments: _.range(5).map(() => ({
    id: faker.datatype.uuid(),
    title: `${faker.random.word()} Experiment `,
    description: faker.commerce.productDescription(),
    active: faker.datatype.boolean() ? 'true' : 'false',
    created_at: faker.datatype.datetime().toISOString(),
    last_updated_at: faker.datatype.datetime().toISOString(),
  })),
});

export default {
  getExperiments,
};
