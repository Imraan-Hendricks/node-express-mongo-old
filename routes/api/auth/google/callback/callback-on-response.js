const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('google', function (err, profile, info) {
    req.body.profile = {
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      provider: profile.provider,
      googleId: profile.id,
    };

    next();
  })(req, res, next);
};
