const Joi = require('joi');
const sample_handler = require('./sample-handler');

module.exports = [
  {
    method: 'GET',
    path: '/api/sample',
    handler: sample_handler.get,
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        query: Joi.object({
          name: Joi.string().min(3).max(10).optional(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/sample/ping',
    handler: async (req, h) => {
      return h.response({answer: 'pong'});
    },
    options: {
      auth: 'jwt-auth-strategy',
      validate: {
        query: Joi.object({
          name: Joi.string().min(3).max(10).optional(),
        }),
      },
    },
  },
];
