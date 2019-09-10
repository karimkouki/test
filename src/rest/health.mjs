import Router from 'koa-router';

const getPing = async (ctx) => {
  ctx.body = { pong: true };
  ctx.status = 200;
};

// Export route installer
export default function installHealthRoutes(r) {
  const router = new Router({ prefix: '/status' });
  router.get('/ping', getPing);
  r.use(router.routes(), router.allowedMethods());
}
