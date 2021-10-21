const Joi = require('joi');
const auth_handler = require('./auth-handler');
const C = require('../constants');

module.exports = [
  {
    method: 'POST',
    path: '/api/auth/register',
    handler: auth_handler.register,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          email_address: Joi.string()
            .regex(new RegExp(C.EMAIL_VALIDATION_REGEX))
            .required(),
          username: Joi.string().min(3).max(100).required(),
          password: Joi.string().min(3).required().required(),
          first_name: Joi.string().min(1).max(100).required(),
          last_name: Joi.string().min(1).max(100).optional(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: auth_handler.login,
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
    method: 'GET',
    path: '/api/auth/is_authenticated',
    handler: auth_handler.is_authenticated,
    options: {
      auth: 'jwt-auth-strategy',
    },
  },
];
