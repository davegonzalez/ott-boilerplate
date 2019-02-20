const routes = require('next-routes');

module.exports = routes()
  .add('index', '/')
  .add('browse', '/browse', 'browse')
  .add('search', '/search', 'search')
  .add('watch', '/watch/:slug', 'watch')
  .add('dynamic', '/browse/:slug', 'dynamic');
