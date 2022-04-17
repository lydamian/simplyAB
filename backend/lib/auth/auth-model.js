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
 
  /**
   * Gets all api tokens for a user optionally
   * filtered by project_id.
   *
   * @param {Number} user_id 
   * @param {Number} project_id
   * 
   * @returns {Promise.<Object>}
   */
  get_api_tokens: async (user_id, project_id) => {
    const rows = await knex_pg
      .select([
        'api_token.*',
        'project.title as project_title',
      ])
      .from('api_token')
      .innerJoin('project', 'api_token.project_id', 'project.id')
      .where('api_token.user_id', user_id)
      .modify((queryBuilder) => {
        if (project_id != null) {
            queryBuilder.where('project_id', project_id);
        }
      })
      .orderBy('created_at', 'desc');
    return rows;
  },

  get_api_token: async (api_token) => {
    const rows = await knex_pg
    .select('*')
    .from('api_token')
    .where('token', api_token)
    return rows[0];
  },

  create_api_token: async (user_id, project_id, api_token) => {

    // check if the project_id matches the user
    const data = {
      user_id,
      project_id,
      token: api_token,
    };

    try {
      const new_api_token = await knex_pg.transaction(async trx => {
        // validate that no other variants exist for this experiment
        const existing_project = await trx('project')
          .select('*')
          .where('id', project_id)
          .andWhere('user_id', user_id);

        if (existing_project.length < 1) {
          throw new Error('user does not own project', user_id, project_id);
        }
        const new_api_tokens = await trx('api_token')
          .insert(data, '*');
        return new_api_tokens[0];
      })
      return new_api_token.token;
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  },

  delete_api_token: async (user_id, api_token) => {
    const num_deleted = await knex_pg('api_token')
      .where('token', api_token)
      .andWhere('user_id', user_id)
      .del();
    return num_deleted > 0;
  },
};
