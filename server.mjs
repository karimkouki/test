import createServer from './src';

// Initialize server application and start listening
(async () => {
  try {
    // Start server
    const server = await createServer();
    await server.start();
  } catch (err) {
    console.error('error', `Error while starting up server: ${err}`); // eslint-disable-line
    process.exit(1);
  }
})();
