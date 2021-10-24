const axios = require('axios');
const faker = require('faker');
const _ = require('lodash');
const C = require('../../lib/constants');
const REGISTER_USER_URL = `http://${C.HOST}:${C.PORT}/api/auth/register`;

require('dotenv').config();
// helpers
const read_cli_options = () => {
  const { program } = require('commander');
  program.version('0.0.1');
  program
    .option('-n, --number <users>', 'number of users to create', 1)

  program.parse(process.argv);
  const options = program.opts();
  return options;
}

const create_user = async () => {
  // Send a POST request
  return axios({
    method: 'post',
    url: REGISTER_USER_URL,
    data: {
      email_address: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    }
  });
};

const create_experiment = async () => {

};

const create_experiment_entites = async () => {

};

const create_variant = async () => {

};


const setup = async () => {
  console.log('setup');
  console.log(`url is: ${REGISTER_USER_URL}`);
}

const start = async () => {
  console.log('start');
  const cli_options = read_cli_options();
  const number_users = cli_options.number;
  const results = await Promise.all(_.range(number_users).map(async (i) => {
    const response = await create_user();
    return response.data;
  }));
  console.log(JSON.stringify(results, null, 2));
}

const cleanup = async () => {
  console.log('cleanup');
}

const main = async () => {
  await setup();
  await start();
  await cleanup();
};

main();
