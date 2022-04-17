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
          user_type: Joi.string()
            .valid(...Object.values(C.user_account_types))
            .optional(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/auth/login_token',
    handler: auth_handler.get_login_token,
    options: {
      auth: false,
      validate: {
        query: Joi.object({
          email_address: Joi.string()
            .regex(new RegExp(C.EMAIL_VALIDATION_REGEX))
            .required(),
          password: Joi.string().min(3).required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/auth/api_token',
    handler: auth_handler.get_api_tokens,
    options: {
      auth: 'jwt-auth-strategy',
    },
  },
  {
    method: 'POST',
    path: '/api/auth/project/{project_id}/api_token',
    handler: auth_handler.create_api_token,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        params: Joi.object({
          project_id: Joi.number()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/auth/api_token',
    handler: auth_handler.delete_api_token,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        payload: Joi.object({
          api_token: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/auth/user',
    handler: auth_handler.get_user,
    options: {
      auth: 'jwt-auth-strategy',
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
