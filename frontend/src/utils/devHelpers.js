/**
 * These functions are helper functions for development!
 * None of these functions should ever appear in production
*/

import faker from 'faker';
import _ from 'lodash';
import helpers from './helpers';

const getFakeApplicantData = ({ userId }) => {
  if (_.isNil(userId)) {
    console.error('[ERROR] func getApplicantData: bruhh why is this user id null for');
    return {};
  }
  return {
    userId,
    name: faker.name.findName(),
    instagramId: faker.datatype.uuid(),
    instagramVisibility: helpers.getRandomItem(['public', 'private']),
    isInstagramVerified: faker.datatype.boolean().toString(),
    birthDate: faker.date.past(),
    displayGender: helpers.getRandomItem(['straight', 'gay', 'bi-sexual']),
  };
};

const getFakeApplicantsData = ({ num }) => [...Array(num).keys()].map(() => ({
  userId: faker.datatype.number(),
  name: faker.name.findName(),
  handle: faker.name.findName(),
  priorityQueue: faker.datatype.number(),
  score: faker.datatype.number(),
  applicationDate: faker.date.past().toDateString(),
}));

export default {
  getFakeApplicantData,
  getFakeApplicantsData,
};
