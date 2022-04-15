import _ from 'lodash';

const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

const calculateAge = (dateOfBirth) => {
  if (_.isEmpty(dateOfBirth)) {
    return 0;
  }
  const diffMS = Date.now() - dateOfBirth.getTime();
  const ageDt = new Date(diffMS);

  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

const getLoginToken = () => localStorage.getItem('simply_ab_login_token');

const defaultExport = {
  getRandomItem,
  calculateAge,
  getLoginToken,
};
export default defaultExport;
