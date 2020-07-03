const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('../config/db');
const User = require('../models/User');

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

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
