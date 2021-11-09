const jwt = require('jsonwebtoken');
const auth_model = require('./auth-model');
const C = require('../constants');

const LOG_TAG = 'auth-interactor';

module.exports = {
  register: async (payload) => {
    auth_model.create_user(payload)
  },

  get_auth_token: async (email_address, password) => {
    const auth_user = await module.exports.get_auth_user(email_address, password);
    if (null == auth_user) {
      throw new Error(`ERROR authenticating user ${email_address}`);
    }
    const auth_token = await module.exports.create_token(
      auth_user.id,
      auth_user.email_address,
      auth_user.password
    );
    return auth_token;
  },

  get_auth_user: async (email_address, password) => {
    return auth_model.get_auth_user(email_address, password);
  },

  create_token: async (id, email_address, password) => {
    console.log(LOG_TAG, id, email_address, password);
    const auth_token = jwt.sign({
      id,
      email_address,
      password,
    }, C.JWT_SHARED_SECRET);

    return auth_token;
  },
};
