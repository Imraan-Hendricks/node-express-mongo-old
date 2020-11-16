exports.routes = (app) => {
  const { ApiRouter } = require('./api/api-router');
  const { BackOfficeRouter } = require('./back-office/back-office-router');
  const { ClientRouter } = require('./client/client-router');

  app.use('/api', ApiRouter);
  app.use('/backOffice', BackOfficeRouter);
  app.use(ClientRouter);
};
