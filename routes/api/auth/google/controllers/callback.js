const passport = require('passport');
const { User } = require('../../../../../models/User');
const { dbErr, handle } = require('../../../../../utils/common');

const passportAuthenticate = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate('google', (err, profile, info) => {
      if (err)
        return reject([
          {
            location: 'passport',
            msg: 'An error has occured',
            param: 'general',
            value: '',
          },
        ]);

      resolve({
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        provider: profile.provider,
        googleId: profile.id,
      });
    })(req, res);
  });

const findUser = async (googleId) => {
  const [user, err] = await handle(User.findOne({ googleId }));
  if (err) throw dbErr;

  return user;
};

const createUser = async (profile) => {
  const [user, err] = await handle(User.create(profile));
  if (err) throw dbErr;

  return user;
};

const login = (req, user) =>
  new Promise((resolve, reject) => {
    req.logIn(user, (err) => {
      if (err)
        return reject([
          {
            location: 'passport',
            msg: 'An error has occured',
            param: 'general',
            value: '',
          },
        ]);

      resolve();
    });
  });

exports.callback = async (req, res) => {
  try {
    const profile = await passportAuthenticate(req, res);

    let user = await findUser(profile.googleId);
    if (!user) user = await createUser(profile);

    await login(req, user);

    return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};
