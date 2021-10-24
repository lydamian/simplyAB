const { knex_pg } = require('../databases/connections');

module.exports = {
  create: async (
    created_by,
    title,
    description,
    active,
    created_at,
    last_updated_at,
  ) => {
    const data = {
      created_by,
      title,
      description,
      active,
      last_updated_at,
      // optional params, conditionally add
      ...(created_at != null && { created_at }),
      ...(last_updated_at != null && { last_updated_at }),
    };
    const result = await knex_pg('experiment')
      .insert(data, ['id']);
    return result[0].id;
  },

  delete: async (id) => {
    const num_deleted = await knex_pg('experiment')
      .where('id', id)
      .del();
    return num_deleted;
  }
};
