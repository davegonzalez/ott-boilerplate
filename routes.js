const routes = require('@yolkai/next-routes').default;

module.exports = routes()
  .add('index', '/')
  .add('browse', '/browse', 'browse')
  .add('search', '/search', 'search')
  .add('login', '/login', 'login')
  .add('signup', '/signup', 'signup')
  .add('dynamic', '/browse/:slug', 'dynamic');
