import constants from 'Constants';

const logger = {
  info: function(...args) {
    if(constants.DEBUG){
      console.log(...args);
    }
  },
  error: function(...args) {
    if(constants.DEBUG){
      console.log(...args);
    }
  }
}

export default logger;