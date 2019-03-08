const next = require('next');
const fetch = require('isomorphic-unfetch');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

const express = require('express');

const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? `http://${process.env.SUBDOMAIN}.crystal.local`
    : `https://${process.env.SUBDOMAIN}.vhx.tv`;

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.post('/login', async (req, res) => {
    try {
      // prettier-ignore
      const login = await fetch(`${baseUrl}/login?email=${req.body.email}&password=${req.body.password}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': "application/json",
          'cache-control': "no-cache",
        }
      })

      res.json(await login.json());
    } catch (e) {
      res.json(e);
    }
  });

  server.use(handler).listen(3000);
});
