const { compare } = require('bcryptjs');
const { check } = require('./local-validation');
const { dbErr, handle } = require('../../../../utils/common');
const { User } = require('../../../../models/User');

const validation = [
  check.contentType('header', true),
  check.username('body', true),
  check.confirmPassword('body', true),
  check.password('body', true),
  check.res,
];

const findUser = async (username) => {
  const projection = {
    _id: 1,
    displayName: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    password: 1,
    createdAt: 1,
  };

  const [data, err] = await handle(
    User.findOne({ username }, projection).lean()
  );
  if (err) throw dbErr;

  if (!data)
    throw [
      {
        location: 'body',
        param: 'username',
        msg: 'no user found',
        value: username,
      },
    ];

  const { password, ...user } = data;

  return [user, password];
};

const comparePassword = async (password, hash) => {
  const [res, err] = await handle(compare(password, hash));
  if (err)
    throw [
      { location: 'bcrypt', param: '', msg: 'an error has occured', value: '' },
    ];

  if (!res)
    throw [
      {
        location: 'body',
        param: 'password',
        msg: 'Incorrect password',
        value: '',
      },
    ];
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

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user, hash] = await findUser(username);
    await comparePassword(password, hash);
    await login(req, user);

    res.json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.login = [...validation, handleLogin];
