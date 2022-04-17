const auth_model = require('./auth-model');
const {
  create_login_token,
  create_api_token,
} = require('./helpers.js')
const LOG_TAG = 'auth-interactor';
const MAX_API_TOKENS = 5;

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

  get_login_token: async (email_address, password) => {
    const auth_user = await module.exports.get_auth_user(email_address, password);
    if (null == auth_user) {
      throw new Error(`ERROR authenticating user ${email_address}`);
    }
    const auth_token = create_login_token(
      auth_user.id,
      auth_user.email_address,
      auth_user.password
    );
    return auth_token;
  },

  get_api_tokens: async (user_id) => {
    // get all the api token
    const api_tokens = await auth_model.get_api_tokens(user_id);
    return api_tokens;
  },

  create_api_token: async (user_id, project_id) => {
    const api_tokens = await auth_model.get_api_tokens(user_id, project_id);
    if (api_tokens.length >= MAX_API_TOKENS) {
      throw new Error(`Error, max API Tokens reached`);
    }

    const new_api_token = create_api_token();
    const api_token = await auth_model.create_api_token(
      user_id,
      project_id,
      new_api_token
    );

    if (api_token != null) {
      return api_token;
    }

    throw new Error(`Error creating api token for ${user_id} got ${api_token} expected ${random_api_token}`);
  },

  delete_api_token: async (user_id, api_token) => {
    const success = await auth_model.delete_api_token(
      user_id,
      api_token
    );

    return success;
  },

  get_user: async (user_id) => {
    return auth_model.get_user(user_id);
  },

  get_auth_user: async (email_address, password) => {
    return auth_model.get_auth_user(email_address, password);
  },
};
