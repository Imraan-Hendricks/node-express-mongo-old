const express = require('express');
const { createServer } = require('http');
const { NODE_ENV, PORT } = require('./config/env');
const db = require('./config/db');
const path = require('path');
const { passport } = require('./middleware/passport');
const { routes } = require('./routes/routes');
const { session } = require('./middleware/session');
const { shutdown } = require('./middleware/shutdown');

const app = express();
const server = createServer(app);

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

shutdown(app, server);

db.connect().then(() => {
  session(app);
  passport(app);
  routes(app);
});

server.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
);
