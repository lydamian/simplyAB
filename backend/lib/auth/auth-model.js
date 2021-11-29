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
};
