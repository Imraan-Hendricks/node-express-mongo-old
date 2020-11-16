const { getConnections } = require('../config/db');
const session = require('express-session');
const { SESSION_SECRET } = require('../config/env');
const MongoStore = require('connect-mongo')(session);

exports.session = (app) => {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: getConnections().main,
      }),
    })
  );
};
