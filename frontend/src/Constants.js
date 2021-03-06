export default {
  SIMPLY_AB_HOSTNAME: process.env.REACT_APP_SIMPLY_AB_BACKEND_HOSTNAME,
  DEBUG: process.env.REACT_APP_DEBUG === 'true',
  dashboard: {
    sections: {
      EXPERIMENTS: 'EXPERIMENTS',
      VARIANTS: 'VARIANTS',
      PROJECTS: 'PROJECTS',
    },
  },
  REGEXES: {
    SNAKE_CASE: /[a-z]+(?:_\S+)*$/,
  },
  HTML_REGEXES: {
    SNAKE_CASE: '[a-z]+(?:_\\S+)*$',
  },
};
