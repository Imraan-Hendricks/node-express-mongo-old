const passport = require('passport');
const { User } = require('../../../../models/User');
const { dbErr, handle } = require('../../../../utils/common');

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

      resolve(profile);
    })(req, res);
  });

const findUser = async (googleId) => {
  const projection = {
    _id: 1,
    displayName: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    createdAt: 1,
  };

  const [user, err] = await handle(
    User.findOne({ googleId }, projection).lean()
  );
  if (err) throw dbErr;

  return user;
};

const createUser = async (profile) => {
  const [user, err] = await handle(User.create(profile));
  if (err) throw dbErr;

  return {
    _id: user._id,
    displayName: user.displayName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt,
  };
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
