import projectsService from 'services/projects';
import logger from 'utils/logger';

const LOG_TAG = '[projectsController]';

const fetchProjects = async (projectIds) => {
  const response = await projectsService.fetchProjects(projectIds);
  const {
    error,
    statusCode,
    description,
  } = response.data;

  logger.info(
    `${LOG_TAG} deleteProject`,
    `HTTP_STATUS: ${response.status}`,
    `error: ${error}`,
    `status_code: ${statusCode}`,
    `description: ${description}`,
  );
};

export default {
  fetchProjects,
};
