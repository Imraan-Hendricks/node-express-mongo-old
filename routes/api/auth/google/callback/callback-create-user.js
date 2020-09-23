const User = require('../../../../../models/User');
const { handle } = require('./callback-helpers');

module.exports = async (req, res, next) => {
  if (req.body.user) return next();

  const newUser = req.body.profile;

  let [user, err] = await handle(User.create(newUser));

  if (err) {
    console.log([
      {
        location: 'db',
        msg: 'An error has occured. Please try again',
        param: 'general',
        value: '',
      },
    ]);

    return res.redirect('/');
  }

  req.body.user = user;

  next();
};
