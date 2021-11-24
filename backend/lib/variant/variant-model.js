const { knex_pg } = require('../databases/connections');
const _ = require('lodash');

module.exports = {
  /**
   * Deletes any old variants for an experiment, and
   * creates many new ones.
   *
   * @param {Number} experiment_id 
   * @param {Object} variants
   * 
   * @returns {Promise.<Array.<Object>>}
   */
  upsert: async (experiment_id, variants) => {
    const data_to_insert = variants.map((variant) => {
      const data = _.omitBy(variant, _.isNil);
      return {
        ...data,
        experiment_id,
      }
    });

    try {
      const new_variants = await knex_pg.transaction(async trx => {
        // validate that no other variants exist for this experiment
        const other_variants_exist = await knex_pg
          .select('id')
          .from('variant')
          .where('experiment_id', experiment_id);

        if (other_variants_exist.length > 0) {
          throw new Error(`variants already exist for ${experiment_id}, cannot create new variants: ${JSON.stringify(variants)}`)
        }
        const new_variants = await trx('variant')
          .insert(data_to_insert, '*');
        return new_variants;
      })
      return new_variants;
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  },

  /**
   * Deletes all variants given an experiment_id.
   *
   * @param {Number} experiment_id 
   * @returns {Promise.<Number>}
   */
  delete_all: async (experiment_id) => {
    const num_deleted = await knex_pg('variant')
      .where('experiment_id', experiment_id)
      .del();
    return num_deleted;
  },


  /**
   * Get all variants given a experiment_id.
   * 
   * @param {Number} experiment_id
   *
   * @returns {Promise.<Array.<Object>>}
   */
   get: async (experiment_id) => {
    const rows = await knex_pg('variant')
      .select('*')
      .where('experiment_id', experiment_id)
    return rows;
  },
}

