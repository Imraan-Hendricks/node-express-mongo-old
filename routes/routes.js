const path = require('path');

module.exports = (app) => {
  app.use('/api', require('./api/api'));
  app.use('/backOffice', require('./back-office/back-office'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
};
