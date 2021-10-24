const Joi = require('joi');
const experiment_handler = require('./experiment-handler');
const C = require('../constants');

module.exports = [
  {
    method: 'POST',
    path: '/api/experiment/create',
    handler: experiment_handler.create,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          created_by: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
          title: Joi.string()
            .min(1)
            .max(100)
            .required(),
          description: Joi.string()
            .required(),
          active: Joi.boolean()
            .optional()
            .default(true),
          created_at: Joi.date()
            .optional()
            .iso()
            .default(new Date()),
          last_updated_at: Joi.date()
            .optional()
            .iso()
            .default(new Date()),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/experiment/update',
    handler: experiment_handler.update,
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
    path: '/api/experiment/delete',
    handler: experiment_handler.delete,
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
    path: '/api/experiment/get',
    handler: experiment_handler.get,
    options: {
      auth: 'jwt-auth-strategy',
    },
  },
  {
    method: 'GET',
    path: '/api/experiment/ping',
    handler: (req, h) => {
      return h.response('pong');
    },
    options: {
      auth: false,
    },
  },
];
