const Joi = require('joi');
const experiment_handler = require('./experiment-handler');
const experiment_constants = require('./experiment-constants');
const constants = require('../constants');

module.exports = [
  {
    method: 'POST',
    path: '/api/experiment/create',
    handler: experiment_handler.create,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        payload: Joi.object({
          project_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
          key: Joi.string()
            .min(1)
            .max(100)
            .regex(constants.REGEXES.SNAKE_CASE)
            .required(),
          title: Joi.string()
            .min(1)
            .max(100)
            .required(),
          description: Joi.string()
            .required(),
          traffic_allocation_percentage: Joi.number()
            .min(0)
            .max(100)
            .required(),
          status: Joi.string()
            .valid(...Object.values(experiment_constants.EXPERIMENT_STATUS_TYPES))
            .optional()
            .default(experiment_constants.DEFAULT_EXPERIMENT_STATUS_TYPE),
          created_at: Joi.date()
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
      auth: 'jwt-auth-strategy',
      validate: {
        payload: Joi.object({
          experiment_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
          key: Joi.string()
            .min(1)
            .max(100)
            .required(),
          title: Joi.string()
            .min(1)
            .max(100)
            .optional(),
          description: Joi.string()
            .optional(),
          traffic_allocation_percentage: Joi.number()
            .min(0)
            .max(100)
            .required(),
          status: Joi.string()
            .valid(...Object.values(experiment_constants.EXPERIMENT_STATUS_TYPES))
            .optional()
            .default(experiment_constants.DEFAULT_EXPERIMENT_STATUS_TYPE),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/experiment/delete',
    handler: experiment_handler.delete,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        payload: Joi.object({
          experiment_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/experiment/get/{project_id?}',
    handler: experiment_handler.get,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        params: Joi.object({
          project_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .optional(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/experiment/ping',
    handler: (req, h) => h.response('pong'),
    options: {
      auth: false,
    },
  },
];
