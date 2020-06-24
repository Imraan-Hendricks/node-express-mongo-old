const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const { shutdown } = require('./services/services');

dotenv.config({ path: './config/.env' });

db.connect();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(shutdown.handleRequests());

require('./routes/routes')(app);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

shutdown.onInterrupt(server, db);
shutdown.onTerminate(server, db);
