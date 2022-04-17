const Joi = require('joi');
const user_handler = require('./user-handler');
const constants = require('../../constants');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/user/{user_id}/experiment/{experiment_key}/variant-info',
    handler: user_handler.get_variant_info,
    options: {
      auth: 'api-auth-strategy',
      validate: {
        params: Joi.object({
          user_id: Joi.string()
            .required(),
          experiment_key: Joi.string()
            .min(1)
            .max(100)
            .regex(constants.REGEXES.SNAKE_CASE)
            .required(),
        }),
      },
    },
  },
  // {
  //   method: 'GET',
  //   path: '/api/v1/users',
  //   handler: user_handler.get_variant_info,
  //   options: {
  //     auth: 'api-auth-strategy',
  //     validate: {
  //       params: Joi.object({
  //         project_key: Joi.string()
  //           .min(1)
  //           .max(100)
  //           .regex(constants.REGEXES.SNAKE_CASE)
  //           .required(),
  //         experiment_key: Joi.string()
  //           .min(1)
  //           .max(100)
  //           .regex(constants.REGEXES.SNAKE_CASE)
  //           .required(),
  //       }),
  //     },
  //   },
  // },
  {
    method: 'GET',
    path: '/api/v1/user/ping',
    handler: (req, h) => h.response('pong'),
    options: {
      auth: false,
    },
  },
];
