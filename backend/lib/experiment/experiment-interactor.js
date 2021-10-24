const jwt = require('jsonwebtoken');
const auth_model = require('./experiment-model');
const C = require('../constants');

const LOG_TAG = 'auth-interactor';

module.exports = {
  create: async (payload) => auth_model.create_user(payload),
  update: async (email_address, password) => {
    console.log(LOG_TAG, email_address, password);
    const auth_token = jwt.sign({
      email_address,
      password,
    }, C.JWT_SHARED_SECRET);

    return auth_token;
  },
  delete: async (email_address, password) => {
    console.log(LOG_TAG, email_address, password);
    const auth_token = jwt.sign({
      email_address,
      password,
    }, C.JWT_SHARED_SECRET);

    return auth_token;
  },
  get: async (email_address, password) => {
    console.log(LOG_TAG, email_address, password);
    const auth_token = jwt.sign({
      email_address,
      password,
    }, C.JWT_SHARED_SECRET);

    return auth_token;
  },
};
