const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');
const {
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
} = require('../config/env');

const googleAuth = () => {
  const config = {
    clientID: GOOGLE_AUTH_CLIENT_ID,
    clientSecret: GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  };

  const verify = async (accessToken, refreshToken, profile, done) =>
    done(null, profile);

  passport.use(new GoogleStrategy(config, verify));
};

const serialization = () => {
  passport.serializeUser((user, done) => {
    if (!ObjectId.isValid(user.id)) return done(true, null);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
  );
};

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  serialization();
  googleAuth();
};
