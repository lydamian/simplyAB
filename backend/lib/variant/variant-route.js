const Joi = require('joi');
const variant_handler = require('./variant-handler');
const C = require('../constants');

module.exports = [
  {
    method: 'POST',
    path: '/api/variant/upsert',
    handler: variant_handler.upsert,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          experiment_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
          variants: Joi.array()
            .items(Joi.object({
              percent: Joi.number()
                .max(Number.MAX_SAFE_INTEGER)
                .required(),
              title: Joi.string()
                .min(1)
                .max(100)
                .required(),
              created_at: Joi.date()
                .optional()
                .iso(),
              last_updated_at: Joi.date()
                .optional()
                .iso(),
            })),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/variant/get/{experiment_id}',
    handler: variant_handler.get,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        params: Joi.object({
          experiment_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/variant/ping',
    handler: (req, h) => h.response('pong'),
    options: {
      auth: false,
    },
  },
];
