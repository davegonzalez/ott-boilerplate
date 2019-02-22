const routes = require('next-routes');

module.exports = routes()
  .add('index', '/')
  .add('browse', '/browse', 'browse')
  .add('search', '/search', 'search')
  .add('watch', '/watch/:slug', 'watch')
  .add('login', '/login', 'login')
  .add('signup', '/signup', 'signup')
  .add('dynamic', '/browse/:slug', 'dynamic');
