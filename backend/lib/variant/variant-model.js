const { knex_pg } = require('../databases/connections');
const _ = require('lodash');
module.exports = {
  create_many: async (variants) => {
    const result = await knex_pg('variant')
      .insert(variants, ['id']);
    return result;
  },

  delete_all: async (experiment_id) => {
    const num_deleted = await knex_pg('variant')
      .where('experiment_id', experiment_id)
      .del();
    return num_deleted;
  },

  delete: async (id) => {
    const num_deleted = await knex_pg('experiment')
      .where('id', id)
      .del();
    return num_deleted;
  }
};
