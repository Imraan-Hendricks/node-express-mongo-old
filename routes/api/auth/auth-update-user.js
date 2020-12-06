const { check } = require('./local/local-validation');
const { dbErr, handle } = require('../../../utils/common');
const { User } = require('../../../models/User');

const validation = [
  check.contentType('header', true),
  check.displayName('body', false),
  check.firstName('body', false),
  check.lastName('body', false),
  check.res,
];

const authCheck = (req) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user)
    throw [
      {
        location: 'passport',
        msg: 'no authenticated user',
        param: 'general',
        value: '',
      },
    ];

  return user;
};

const updateUser = async (_id, displayName, firstName, lastName) => {
  const projection = {
    _id: 1,
    displayName: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    createdAt: 1,
  };
  const options = { new: true, projection };

  let update = {};
  if (displayName) update.displayName = displayName;
  if (firstName) update.firstName = firstName;
  if (lastName) update.lastName = lastName;

  const [user, err] = await handle(
    User.findOneAndUpdate({ _id }, update, options).lean()
  );
  if (err) throw dbErr;

  if (!user)
    throw [
      {
        location: 'passport',
        msg: 'no user found',
        param: 'general',
        value: _id,
      },
    ];

  return user;
};

const handleUpdateUser = async (req, res) => {
  try {
    const user = authCheck(req);

    const { displayName, firstName, lastName } = req.body;

    const updatedUser = await updateUser(
      user._id,
      displayName,
      firstName,
      lastName
    );

    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.updateUser = [...validation, handleUpdateUser];
