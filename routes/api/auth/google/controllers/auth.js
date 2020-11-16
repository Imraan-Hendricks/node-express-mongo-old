const passport = require('passport');

exports.auth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});
