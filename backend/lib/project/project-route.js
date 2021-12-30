const Joi = require('joi');
const project_handler = require('./project-handler');
const project_constants = require('./project-constants');

module.exports = [
  {
    method: 'POST',
    path: '/api/project/create',
    handler: project_handler.create,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        payload: Joi.object({
          title: Joi.string()
            .min(1)
            .max(100)
            .required(),
          description: Joi.string()
            .required(),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/project/update',
    handler: project_handler.update,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        payload: Joi.object({
          project_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
          title: Joi.string()
            .min(1)
            .max(100)
            .required(),
          description: Joi.string()
            .required(),
          status: Joi.string()
            .valid(...Object.values(project_constants.PROJECT_STATUS_TYPES))
            .optional()
            .default(project_constants.DEFAULT_PROJECT_STATUS_TYPE),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/project/delete',
    handler: project_handler.delete,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        payload: Joi.object({
          project_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/project/get',
    handler: project_handler.get,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        query: Joi.object({
          user_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/project/ping',
    handler: (req, h) => h.response('pong'),
    options: {
      auth: false,
    },
  },
];
