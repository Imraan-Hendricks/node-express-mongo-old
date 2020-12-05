const bcrypt = require('bcryptjs');
const { check } = require('./local-validation');
const { dbErr, handle } = require('../../../../utils/common');
const { User } = require('../../../../models/User');

const validation = [
  check.contentType('header', true),
  check.username('body', true),
  check.displayName('body', true),
  check.firstName('body', true),
  check.lastName('body', true),
  check.email('body', true),
  check.confirmPassword('body', true),
  check.password('body', true),
  check.res,
];

const findUser = async (username) => {
  const projection = { _id: 1 };

  const [data, err] = await handle(
    User.findOne({ username }, projection).lean()
  );
  if (err) throw dbErr;

  if (data)
    throw [
      {
        location: 'body',
        param: 'username',
        msg: 'username already exists',
        value: username,
      },
    ];
};

const hashPassword = async (password) => {
  const [hash, err] = await handle(bcrypt.hash(password, 10));
  if (err)
    throw [
      {
        location: 'bcrypt',
        msg: 'An error has occured. Please try again',
        param: 'general',
        value: '',
      },
    ];
  return hash;
};

const createUser = async (newUser) => {
  const [user, err] = await handle(User.create(newUser));
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

const handleRegister = async (req, res) => {
  try {
    const {
      username,
      displayName,
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    await findUser(username);

    const hash = await hashPassword(password);

    const newUser = {
      username,
      displayName,
      firstName,
      lastName,
      email,
      password: hash,
    };

    const user = await createUser(newUser);

    await login(req, user);

    res.json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.register = [...validation, handleRegister];
