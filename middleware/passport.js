const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
} = require('../config/env');
const { handle } = require('../utils/common');
const ObjectId = require('mongoose').Types.ObjectId;

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
  const { User } = require('../models/User');

  passport.serializeUser((user, done) => {
    if (!ObjectId.isValid(user._id)) return done(true, null);
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    const projection = {
      _id: 1,
      displayName: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      createdAt: 1,
    };

    const [user, err] = await handle(User.findById(_id, projection).lean());
    done(err, user);
  });
};

exports.passport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  serialization();
  googleAuth();
};
