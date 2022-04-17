const crypto = require('crypto');
const _ = require('lodash');
const variant_model = require('../../variant/variant-model')

/**
 * Whether we should include a user in a sample. True if
 * the hashed_id_normalized is < the sample_rate.
 *
 * @param {Number} hashed_id_normalized a users id normalized to a number
 * between [0 and 1)
 * @param {Number} sample_rate The sample rate of the template
 *
 * @return {Boolean} true if we want to include a user in a sample
 */
const should_we_shard_user_in_experiment = (hashed_id_normalized, sample_rate) => {
  return hashed_id_normalized < sample_rate;
}

/**
 * Creates a map of the variant mapped to its upper and lower bound
 * partitions.
 * upper and lower bound are values in between 0 and 1.
 * E.g if our sample space is from [0 - 1], and we have 2 variants.
 * Variant_1 will be from [0 - 0.50] and Variant_2 will be mapped to
 * [0.50 - 1].
 *
 * @param {Objects} variants An object with the variants
 * @param {Number} experiment_traffic_allocation_percentage The sample rate of the template.
 *
 * @return {Object} A mapping between a variant and its upper and lower
 * bound partitions
 */
  const get_variants_upper_and_lower_bound_ranges = (variants, experiment_traffic_allocation_percentage) => {
  const variant_bounds = {};
  let prev_upper_bound = 0;
  for (const variant of variants) {
    const variant_traffic_allocation_percentage = variant.variant_traffic_allocation_percentage;
    const variant_id = variant.variant_id;
    variant_bounds[variant_id] = {
      lower_bound: prev_upper_bound,
      upper_bound: prev_upper_bound + (experiment_traffic_allocation_percentage / 100 * variant_traffic_allocation_percentage),
    };
    prev_upper_bound = variant_bounds[variant_id].upper_bound;
  }
  return variant_bounds;
}

/**
 * Gets the variant to use for a user. Variant maps to
 * the partition where the hashed_id_normalized is in between the
 * lower and upper bound.
 *
 * @param {number} hashed_id_normalized a number between [0 and 1)
 * @param {Objects} variants_indexed The possible variants
 * @param {Object} variants_upper_and_lower_bound_range an object containing
 * variants and their partitions
 *
 * @return {string|null} the variant to use
 */
const get_variant = (
  hashed_id_normalized,
  variants_indexed,
  variants_upper_and_lower_bound_ranges
) => {
  if (0 === Object.keys(variants_indexed).length) {
    return null;
  }
  for (const [variant_id, {
    lower_bound, upper_bound,
  }] of Object.entries(variants_upper_and_lower_bound_ranges)) {
    if (
      hashed_id_normalized > lower_bound &&
      hashed_id_normalized < upper_bound
    ) {
      return variants_indexed[variant_id];
    }
  }
  return null;
}

/**
 * Normalizes a hex_string to a number between [0 and 100)
 *
 * @param {String|Number} hashed_id a number between [0 and 100)
 *
 * @return {number} a number between [0 and 100)
 */
const map_hex_string_to_num_between_0_and_100 = (hashed_id) => {
  const number_of_bits = 4 * hashed_id.length;
  return parseInt(hashed_id, 16) / Math.pow(2, number_of_bits) * 100;
}

module.exports = {
  get_variant_info: async (project_id, experiment_key, user_id) => {
    variants_info = await variant_model.get_variants_by_key(project_id, experiment_key);
    variants_info_indexed = variants_info.reduce((hash, variant_info) => {
      hash[variant_info.variant_id] = variant_info;
      return hash;
    }, {});

    // sharding logic
    const hashed_id = crypto
      .createHash('sha256')
      .update(String(variants_info[0].experiment_id), 'utf-8')
      .update(String(user_id), 'utf-8')
      .digest('hex');
    const hashed_id_normalized = map_hex_string_to_num_between_0_and_100(hashed_id)
    const experiment_traffic_allocation_percentage = variants_info[0].experiment_traffic_allocation_percentage

    const shard_user_in_experiment = should_we_shard_user_in_experiment(
      hashed_id_normalized,
      experiment_traffic_allocation_percentage
    );

    if (!shard_user_in_experiment) {
      return {         
        project_id,
        experiment_key,
        variant: null,
      }
    }

    const variants_upper_and_lower_bound_ranges = get_variants_upper_and_lower_bound_ranges(
      variants_info,
      experiment_traffic_allocation_percentage
    );
    const variant = get_variant(
      hashed_id_normalized,
      variants_info_indexed,
      variants_upper_and_lower_bound_ranges
    );
      return {
        project_id,
        experiment_key,
        variant,
      }
  }
};
