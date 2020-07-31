const User = require('../../../../../models/User');
const { handle } = require('./callback-helpers');

module.exports = async (req, res, next) => {
  const googleId = req.body.profile.googleId;

  let [user, err] = await handle(User.findOne({ googleId }));

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
