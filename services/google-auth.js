const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

module.exports = () => {
  passport.use(new GoogleStrategy(config, verify));
};

const config = {
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
};

const verify = async (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};
