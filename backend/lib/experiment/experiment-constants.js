const EXPERIMENT_STATUS_TYPES = {
  DRAFT: 'DRAFT',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED',
};

module.exports = {
  EXPERIMENT_STATUS_TYPES,
  DEFAULT_EXPERIMENT_STATUS_TYPE: EXPERIMENT_STATUS_TYPES.DRAFT,
};
