const express = require('express');
const { createServer } = require('http');
const { connect } = require('./config/db');
const { passport } = require('./middleware/passport');
const path = require('path');
const { PORT, NODE_ENV } = require('./config/env');
const { routes } = require('./routes/routes');
const { session } = require('./middleware/session');
const { shutdown } = require('./middleware/shutdown');

const main = async () => {
  await connect();

  const app = express();
  const server = createServer(app);

  app.use(express.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));

  shutdown(app, server);
  session(app);
  passport(app);
  routes(app);

  server.listen(PORT, () =>
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
  );
};

main();
