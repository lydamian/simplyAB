import axios from 'utils/request';
import constants from 'Constants';
import logger from 'utils/logger';
import helpers from 'utils/helpers';

const LOG_TAG = '[services/projects]';
/**
 * Gets all projects for a user.
 *
 * @param {Number} userId
 *
 * @returns {Promise.<Object>} response
 */
const getProjects = async (userId) => {
  try {
    const queryParams = new URLSearchParams({
      user_id: userId,
    }).toString();
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/project/get?${queryParams}`,
      headers: {
        Authorization: helpers.getAuthToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
/**
 * Creates a new project.
 *
 * @param {String} userId
 * @param {String} title
 * @param {String} description
 *
 * @returns {Promise.<Object>} response
 */
const createProject = async (
  title,
  description,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/project/create`,
      data: {
        title,
        description,
      },
      headers: {
        Authorization: helpers.getAuthToken(),
      },
    });
    logger.info(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/create`,
      response.status,
      JSON.stringify(response.data),
    );
    return response;
  } catch (error) {
    logger.error(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/create`,
      error.response.data,
      error.response.status,
      error.message,
      error.stack,
    );
    return error.response;
  }
};
/**
 * Deletes a project.
 *
 * @param {Number} projectId
 *
 * @returns {Promise.<Object>} response
 */
const deleteProject = async (projectId) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/project/delete`,
      data: {
        project_id: projectId,
      },
      headers: {
        Authorization: helpers.getAuthToken(),
      },
    });
    logger.info(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/delete`,
      response.status,
      JSON.stringify(response.data),
    );
    return response;
  } catch (error) {
    logger.error(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/delete`,
      error.response.data,
      error.response.status,
      error.message,
      error.stack,
    );
    return error.response;
  }
};

/**
 * Updates a project.
 *
 * @param {Number} projectId
 * @param {String} title
 * @param {String} description
 *
 * @returns {Promise.<Object>} response
 */
const updateProject = async (
  projectId,
  title,
  description,
) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/project/update`,
      data: {
        project_id: projectId,
        title,
        description,
      },
      headers: {
        Authorization: helpers.getAuthToken(),
      },
    });
    logger.info(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/update`,
      response.status,
      JSON.stringify(response.data),
    );
    return response;
  } catch (error) {
    logger.error(
      LOG_TAG,
      `${constants.SIMPLY_AB_HOSTNAME}/api/project/update`,
      error.response.data,
      error.response.status,
      error.message,
      error.stack,
    );
    return error.response;
  }
};

export default {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
};
