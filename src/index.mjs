import config from 'config';
import Koa from 'koa';
import restInitialize from './rest';

const SERVER_PORT = config.get('SERVER_PORT');
const SERVER_IP = config.get('SERVER_IP');
const SERVER_ORIGIN = config.get('SERVER_ORIGIN');

export default async function createServer() {
  // Initialize logger
  console.log('info', 'Creating server.');
  // Install routes
  const koaApp = new Koa();
  restInitialize(koaApp);
  // Done
  console.log('info', 'Server created, ready to start listening.');
  // Create a thing that can start and stop
  return new class Server {
    async start() {
      // Initialize Koa App
      await new Promise((resolve) => {
        console.log('SERVER tries to listen...');
        this._server = koaApp.listen(SERVER_PORT, SERVER_IP, () => {
          console.log('info', `SERVER listening on ${SERVER_IP}:${SERVER_PORT} in ${process.env.NODE_ENV || 'development'} mode`);
          resolve();
        });
      });
    }
    async shutdown() {
      // Close Koa app
      if (this._server) {
        this._server.close();
        this._server = null;
      }
    }
    getOrigin() { // eslint-disable-line
      return SERVER_ORIGIN;
    }
  }();
}
