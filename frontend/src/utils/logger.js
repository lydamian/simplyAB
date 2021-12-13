import constants from 'Constants';

const logger = {
  info(...args) {
    if (constants.DEBUG) {
      console.log(...args);
    }
  },
  error(...args) {
    if (constants.DEBUG) {
      console.error(...args);
    }
  },
};

export default logger;
