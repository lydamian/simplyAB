const { knex_pg } = require('../databases/connections');

module.exports = {
  create: async (
    project_id,
    title,
    description,
    active,
    created_at,
    last_updated_at
  ) => {
    const data = {
      project_id,
      title,
      description,
      active,
      last_updated_at,
      // optional params, conditionally add
      ...(created_at != null && { created_at }),
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
  },

  update: async (
    experiment_id,
    title,
    description,
    active
  ) => {
    const updated_rows = await knex_pg('experiment')
    .where('id', experiment_id)
    .update({
      title,
      description,
      active
    })
    const success = updated_rows > 0;
    return success;
  },

  /**
   * Get all active experiments given a project_id.
   * 
   * @param {Number} project_id
   *
   * @returns {Promise.<Array.<Object>>}
   */
  get: async (project_id) => {
    const rows = await knex_pg('experiment')
      .select('*')
      .where('project_id', project_id)
      .andWhere('active', true);
    return rows;
  }
};
