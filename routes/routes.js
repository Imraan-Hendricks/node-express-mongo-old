exports.routes = (app) => {
  app.use('/api', require('./api/api'));
  app.use('/backOffice', require('./back-office/back-office'));
  app.use(require('./client/client'));
};
