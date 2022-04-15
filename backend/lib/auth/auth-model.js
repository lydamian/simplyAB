const { knex_pg } = require('../databases/connections');

module.exports = {
  create_user: async (
    email_address,
    username,
    password,
    first_name,
    last_name,
    user_type
  ) => {
    const data = {
      email_address: email_address,
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      ...(user_type != null && { user_type: user_type }),
    };
    const result = await knex_pg('user_account').insert(data, ['id']);
    return result[0].id;
  },

  is_existing_user: async (email_address) => {
    const result = await knex_pg
      .select('id')
      .from('user_account')
      .where('email_address', email_address)
    return true === (result?.[0] && true);
  },

  get_user: async (user_id) => {
    const result = await knex_pg
      .select(
        'id',
        'email_address',
        'username',
        'first_name',
        'last_name',
        'user_type',
        'created_at',
      )
      .from('user_account')
      .where('id', user_id)
    return result[0] ?? null;
  },
 
  get_auth_user: async (email_address, password) => {
    const data = [
      {
        email_address,
        password,
      },
    ];
    const result = await knex_pg
      .select('email_address', 'password', 'id')
      .from('user_account')
      .where('email_address', email_address)
      .andWhere('password', password);
    return result[0] ?? null;
  },
 
  get_api_tokens: async (user_id) => {
    const rows = await knex_pg
      .select('*')
      .from('api_token')
      .where('user_id', user_id)
      .orderBy('created_at', 'desc');
    return rows;
  },

  get_auth_user_from_api_token: async (api_token, user_id) => {
    const rows = await knex_pg
    .select('*')
    .from('api_token')
    .where('token', api_token)
    .andWhere('user_id', user_id);
    return rows[0];
  },

  create_api_token: async (user_id, api_token) => {
    const data = {
      user_id,
      token: api_token,
    };
    const result = await knex_pg('api_token')
      .insert(data, ['token']);
    return result[0].token;
  },

  delete_api_token: async (user_id, api_token) => {
    const num_deleted = await knex_pg('api_token')
      .where('token', api_token)
      .where('user_id', user_id)
      .del();
    return num_deleted > 0;
  },
};
