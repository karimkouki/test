const chai = require('chai');
const config = require('config');

const SERVER_ORIGIN = config.get('SERVER_ORIGIN');
const SERVER_BASE_PATH = config.get('SERVER_BASE_PATH');

// Initialize test environment
global.expect = chai.expect;

global.withServer = function withServer(theBefore, theAfter, setter) {
  let server;

  theBefore(async () => {
    // TODO: create Request class.
    const createServer = (await import('../src')).default;
    server = await createServer();
    await server.start();
    setter({
      // request: new Request({ origin: SERVER_ORIGIN, basePath: SERVER_BASE_PATH, testing: true }),
    });
  });
  theAfter(async () => {
    await server.shutdown();
  });
};

