import axios from 'utils/request';
import constants from 'Constants';
import helpers from 'utils/helpers';

/**
 * Gets all experiments for a user or a projectId optionally.
 *
 * @param {Number|null} projectId
 *
 * @returns {Object}
}
 */
const getExperiments = async (projectId) => {
  try {
    const queryParams = new URLSearchParams({
      project_id: projectId,
    }).toString();
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/experiment/get?${queryParams}`,
      headers: {
        Authorization: helpers.getAuthToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export default {
  getExperiments,
};
