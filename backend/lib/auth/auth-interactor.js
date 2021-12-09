const jwt = require('jsonwebtoken');
const auth_model = require('./auth-model');
const C = require('../constants');

const LOG_TAG = 'auth-interactor';

module.exports = {
  register: async (
    email_address,
    username,
    password,
    first_name,
    last_name,
    user_type
  ) => {
    // check if user already exists
    const is_existing_user = await auth_model.is_existing_user(email_address);
    if (is_existing_user) {
      throw new Error(`email already taken ${email_address}`);
    }
    auth_model.create_user(
      email_address,
      username,
      password,
      first_name,
      last_name,
      user_type
    )
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

  get_user: async (user_id) => {
    return auth_model.get_user(user_id);
  },

  get_auth_user: async (email_address, password) => {
    return auth_model.get_auth_user(email_address, password);
  },

  create_token: async (user_id, email_address, password) => {
    const auth_token = jwt.sign({
      user_id,
      email_address,
      password,
    }, C.JWT_SHARED_SECRET, { expiresIn: '1h'});

    return auth_token;
  },
};
