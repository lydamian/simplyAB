const Joi = require('joi');
const variant_handler = require('./variant-handler');
const C = require('../constants');

module.exports = [
  {
    method: 'POST',
    path: '/api/variant/create_many',
    handler: variant_handler.create_many,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          variants: Joi.array()
            .items(Joi.object({
              percent: Joi.number()
                .max(Number.MAX_SAFE_INTEGER)
                .required(),
              title: Joi.string()
                .min(1)
                .max(100)
                .required(),
              experiment_id: Joi.number()
                .max(Number.MAX_SAFE_INTEGER)
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
    method: 'PUT',
    path: '/api/variant/update',
    handler: variant_handler.update,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          email_address: Joi.string()
            .regex(new RegExp(C.EMAIL_VALIDATION_REGEX))
            .required(),
          password: Joi.string().min(3).required().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/variant/delete',
    handler: variant_handler.delete,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/variant/get',
    handler: variant_handler.get,
    options: {
      auth: 'jwt-auth-strategy',
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
