const { dbErr, handle } = require('../../../utils/common');
const { User } = require('../../../models/User');

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

const deleteUser = async (_id) => {
  const [data, err] = await handle(User.deleteOne({ _id }));
  if (err) throw dbErr;

  if (data.deletedCount === 0)
    throw [
      {
        location: 'passport',
        msg: 'no user found',
        param: 'general',
        value: _id,
      },
    ];
};

const handleDelete = async (req, res) => {
  try {
    const user = authCheck(req);

    await deleteUser(user._id);
    req.logout();

    res.json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.deleteUser = handleDelete;
