const express = require('express');
const { NODE_ENV, PORT } = require('./config/env');
const db = require('./config/db');
const path = require('path');
const shutdown = require('./middleware/shutdown');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(shutdown.handleRequests());

db.connect().then(() => {
  require('./middleware/session')(app);
  require('./middleware/passport')(app);
  require('./routes/routes')(app);
});

const server = app.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
);

shutdown.onInterrupt(server, db);
shutdown.onTerminate(server, db);
