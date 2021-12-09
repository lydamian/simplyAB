const Hapi = require('@hapi/hapi');
const Jwt = require('hapi-auth-jwt2');
const C = require('./lib/constants');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const init = async () => {
  const server = Hapi.server({
    port: C.PORT ?? 5000,
    host: C.HOST ?? '0.0.0.0',
    // SET THIS TO * for development purposes ONLY!!!! should not set this in production
    debug: {
      request: '*',
    },
    routes: {
      cors: true,
    }
  });

  await server.register(Jwt);
  server.auth.strategy('jwt-auth-strategy', 'jwt',
  {
    key: C.JWT_SHARED_SECRET,
    verifyOptions: {
      algorithms: [ 'HS256' ] // specify your secure algorithm
    },
    // (required) the function which is run once the Token has been decoded with signature async function(decoded, request, h) where:
    // decoded - (required) is the decoded and verified JWT received in the request
    // request - (required) is the original request received from the client
    // h - (required) the response toolkit.
    // Returns an object { isValid, credentials, response } where:
    // isValid - true if the JWT was valid, otherwise false.
    // credentials - (optional) alternative credentials to be set instead of decoded.
    // response - (optional) If provided will be used immediately as a takeover response.
    // errorMessage - (optional defaults to 'Invalid credentials') - the error message raised to Boom if the token is invalid (passed to errorFunc as errorContext.message)
    validate: (decoded, request, h) => {
      return {
        isValid: true,
        credentials: {
          email_address: decoded.email_address,
          user_id: decoded.user_id,
        },
      };
    },
  });

  // Set the auth strategy
  server.auth.default('jwt-auth-strategy');

  server.events.on('response', (request) => {
    console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}`);
  });

  server.route(require('./lib/sample/sample-route'));
  server.route(require('./lib/auth/auth-route'));
  server.route(require('./lib/project/project-route'));
  server.route(require('./lib/experiment/experiment-route'));
  server.route(require('./lib/variant/variant-route'));

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
