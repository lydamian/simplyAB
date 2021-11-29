
const project_model = require('./project-model');
module.exports = {
  /**
   * Validates whether a user owns a project.
   *
   * @param {Number} user_id 
   * @param {Number} project_id
   *
   * @returns {Promise.<Boolean>}
   * @throws an error if user does not own project.
   */
  validate_project_ownership: async (user_id, project_id) => {
    const project_owner = await project_model.get_owner(project_id);
    if (project_owner != user_id) {
      throw new Error(`User: ${user_id} is not project: ${project_id} owner`);
    }
    return true;
  }
}