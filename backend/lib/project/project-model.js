const { default: knex } = require('knex');
const { knex_pg } = require('../databases/connections');

module.exports = {
  create: async (
    user_id,
    title,
    description,
    created_at,
    last_updated_at
  ) => {
    const data = {
      user_id,
      title,
      description,
      // optional params, conditionally add
      ...(created_at != null && { created_at }),
      ...(last_updated_at != null && { last_updated_at }),
    };
    const result = await knex_pg('project')
      .insert(data, ['id']);
    return result[0].id;
  },

  update: async (user_id, project_id, title, description) => {
    const updated_rows = await knex_pg('project')
      .where('id', project_id)
      .andWhere('user_id', user_id)
      .update({
        title,
        description,
      })
    const success = updated_rows > 0;
    return success;
  },

  delete: async (id) => {
    const num_deleted = await knex_pg('project')
      .where('id', id)
      .del();
    return num_deleted;
  },

  get: async (user_id) => {
    const rows = await knex_pg('project')
      .select('*')
      .where('user_id', user_id);
    return rows;
  }
};
