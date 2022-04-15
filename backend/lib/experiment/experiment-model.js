const { knex_pg } = require('../databases/connections');
const DUPLICATE_CONSTRAINT_VIOLATED_ERROR = 23505;

module.exports = {
  /**
   * Creates an experiment.
   *
   * @param {Number} project_id 
   * @param {String} key 
   * @param {String} title 
   * @param {String} description 
   * @param {Number} traffic_allocation_percentage 
   * @param {String} status 
   * @param {Date} created_at
   *
   * @returns {Promise.<Object>}]
   * @throws {Error} if unique constraint violated on
   * (project_id, key) OR
   * (project_id, title)
   */
  create: async (
    project_id,
    key,
    title,
    description,
    traffic_allocation_percentage,
    status,
    created_at
  ) => {
    const data = {
      project_id,
      key,
      title,
      description,
      traffic_allocation_percentage,
      status,
      // optional params, conditionally add
      ...(created_at != null && { created_at }),
    };
    const result = await knex_pg('experiment')
      .insert(data, ['id']);
    return result[0].id;
  },

  delete: async (experiment_id) => {
    const num_deleted = await knex_pg('experiment')
      .where('id', experiment_id)
      .del();
    return num_deleted;
  },

  update: async (
    experiment_id,
    key,
    title,
    description,
    traffic_allocation_percentage,
    status
  ) => {
    const updated_rows = await knex_pg('experiment')
    .where('id', experiment_id)
    .update({
      title,
      key,
      description,
      traffic_allocation_percentage,
      status
    })
    const success = updated_rows > 0;
    return success;
  },

  /**
   * Get all experiments given a project_id and optionally a status.
   * 
   * @param {Number} user_id
   * @param {Number|null} project_id (optional)
   * @param {Number|null} experiment_id (optional)
   *
   * @returns {Promise.<Array.<Object>>}
   */
  get: async (user_id, project_id, experiment_id) => {
    const rows = await knex_pg
      .select('experiment.*')
      .from('experiment')
      .innerJoin('project', 'experiment.project_id', 'project.id')
      .andWhere('user_id', user_id)
      .modify((queryBuilder) => {
        if (project_id != null) {
            queryBuilder.where('project_id', project_id);
        }
        if (experiment_id != null) {
            queryBuilder.where('experiment_id', experiment_id);
        }
      })
    return rows;
  },
  
  /**
   * gets experiment owner.
   *
   * @param {Number} project_id 
   * @returns {Promise.<Number>|null}
   */
    get_owner: async (experiment_id) => {
    const rows = await knex_pg
      .select('user_id')
      .from('experiment')
      .innerJoin('project', 'experiment.project_id', 'project.id')
      .where('experiment.id', experiment_id);
    return rows?.[0]?.user_id ?? null;
  },
};
