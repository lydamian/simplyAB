const jwt = require('jsonwebtoken');
const project_model = require('./project-model');
const C = require('../constants');

const LOG_TAG = 'auth-interactor';

module.exports = {
  create: async (
    user_id,
    title,
    description
  ) => {
    const project_id = await project_model.create(
      user_id,
      title,
      description,
    );
    return project_id;
  },
  update: async (user_id, project_id, title, description) => {
    const success = await project_model.update(user_id, project_id, title, description);
    if (success === false) {
      console.error(
        `Error updating project for user: ${user_id}`,
        `project_id: ${project_id},`,
        `title: ${title},`,
        `description: ${description}`
      );
      throw new Error(`unsuccessfully updated project ${project_id} for user: ${user_id}`);
    }
    return success;
  },
  delete: async (id) => {
    const num_deleted = await project_model.delete(id);
    return num_deleted > 0;
  },
  get: async (user_id) => {
    return project_model.get(user_id);
  },
};
