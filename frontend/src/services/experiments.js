import axios from 'utils/request';
import constants from 'Constants';
import helpers from 'utils/helpers';

/**
 * Gets all experiments for a user or a projectId optionally.
 *
 * @param {Number|null} projectId
 * @param {Number|null} experimentId
 *
 * @returns {Promise.<Object>}
}
 */
const getExperiments = async (
  projectId,
  experimentId,
) => {
  try {
    const query = {
      ...(projectId != null
        ? {
          project_id: projectId,
        }
        : {}
      ),
      ...(experimentId != null
        ? {
          experiment_id: experimentId,
        }
        : {}
      ),
    };
    const queryParams = new URLSearchParams(query).toString();
    const response = await axios({
      method: 'get',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/experiment/get?${queryParams}`,
      headers: {
        Authorization: helpers.getLoginToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Creates an experiment.
 *
 * @param {Number} projectId
 * @param {Sring} key
 * @param {String} description
 * @param {Number} trafficAllocationPercentage
 *
 * @returns {Promise.<Object>}
}
 */
const createExperiment = async (
  projectId,
  key,
  title,
  description,
  trafficAllocationPercentage,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/experiment/create`,
      data: {
        project_id: projectId,
        key,
        title,
        description,
        traffic_allocation_percentage: trafficAllocationPercentage,
      },
      headers: {
        Authorization: helpers.getLoginToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Creates an experiment.
 *
 * @param {Number} experimentId
 * @param {String} key
 * @param {String} title
 * @param {String} description
 * @param {Number} trafficAllocationPercentage
 * @param {String} status
 *
 * @returns {Promise.<Object>}
}
 */
const updateExperiment = async (
  experimentId,
  key,
  title,
  description,
  trafficAllocationPercentage,
  status,
) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${constants.SIMPLY_AB_HOSTNAME}/api/experiment/update`,
      data: {
        experiment_id: experimentId,
        key,
        title,
        description,
        traffic_allocation_percentage: trafficAllocationPercentage,
        status,
      },
      headers: {
        Authorization: helpers.getLoginToken(),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export default {
  getExperiments,
  createExperiment,
  updateExperiment,
};
