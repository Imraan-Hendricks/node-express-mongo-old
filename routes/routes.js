const path = require('path');
const { NODE_ENV } = require('../config/env');

module.exports = (app) => {
  app.use('/api', require('./api/api'));
  app.use('/backOffice', require('./back-office/back-office'));

  app.get('*', (req, res) => {
    let client;

    if (NODE_ENV !== 'production') {
      client = 'http://localhost:3000';
      const url = req.originalUrl;
      return res.redirect(client + url);
    }

    client = path.join(__dirname, '../../client/build/index.html');
    res.sendFile(client);
  });
};
