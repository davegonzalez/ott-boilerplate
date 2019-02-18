const routes = require('next-routes');

module.exports = routes()
  .add('index', '/')
  .add('browse', '/browse', 'browse')
  .add('/:slug', 'dynamic');
