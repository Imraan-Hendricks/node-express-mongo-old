const { closeConnections } = require('../config/db');

let state = false;

const cleanup = (server) => {
  state = true;
  console.log('Closing http server');
  server.close(() => {
    console.log('Http server closed');
    closeConnections().then(() => {
      console.log('Shutting down');
      process.exit(0);
    });
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcing shut down');
    process.exit(1);
  }, 30 * 1000);
};

const handleRequests = (req, res, next) => {
  if (!state) return next();

  res.setHeader('Connection', 'close');
  res.status(503).send('Server is in the process of restarting');
};

const onInterrupt = (server) => {
  process.on('SIGINT', () => cleanup(server));
};

const onTerminate = (server) => {
  process.on('SIGTERM', () => cleanup(server));
};

exports.shutdown = (app, server) => {
  app.use(handleRequests);
  onInterrupt(server);
  onTerminate(server);
};
