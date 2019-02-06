const nextRoutes = require('next-routes');
const routes = (module.exports = nextRoutes());

routes
  .add('index', '/')
  .add('browse', '/browse', 'browse')
  .add('dynamic', '/:slug', 'dynamic');
