const { knex_pg } = require('../databases/connections');

module.exports = {
  create_user: async (options) => {
    const data = [
      {
        email_address: options.email_address,
        username: options.username,
        password: options.password,
        first_name: options.first_name,
        last_name: options.last_name,
        ...(options.user_type != null && { user_type: options.user_type }),
      },
    ];
    const result = await knex_pg('user_account').insert(data, ['id']);
    return result[0].id;
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
