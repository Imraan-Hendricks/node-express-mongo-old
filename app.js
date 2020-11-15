const express = require('express');
const { NODE_ENV, PORT } = require('./config/env');
const db = require('./config/db');
const path = require('path');
const { passport } = require('./middleware/passport');
const { routes } = require('./routes/routes');
const { session } = require('./middleware/session');
const shutdown = require('./middleware/shutdown');

const app = express();

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(shutdown.handleRequests());

db.connect().then(() => {
  session(app);
  passport(app);
  routes(app);
});

const server = app.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
);

shutdown.onInterrupt(server);
shutdown.onTerminate(server);
