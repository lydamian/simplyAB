const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const C = require('../constants');

module.exports = {
  create_login_token: (user_id, email_address, password) => {
    const auth_token = jwt.sign({
      user_id,
      email_address,
      password,
    }, C.JWT_SHARED_SECRET, { expiresIn: '1h' });

    return auth_token;
  },

  create_api_token: () => crypto.randomBytes(32).toString('hex'),
};
