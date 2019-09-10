import Router from 'koa-router';
import installHealthRoutes from './health';

export default async function initialize(koaApp) {
  console.log('info', 'Initializing Rest API...');
  // Install API routes
  const router = new Router({ prefix: '/api' });
  installHealthRoutes(router);
  koaApp.use(router.routes(), router.allowedMethods());
}
