const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('../config/db');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: db.getConnections().main,
      }),
    })
  );
};
