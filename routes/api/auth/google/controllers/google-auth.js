const passport = require('passport');

exports.googleAuthController = passport.authenticate('google', {
  scope: ['profile', 'email'],
});
