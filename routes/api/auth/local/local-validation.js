const { validate, res } = require('../../../../utils/validation');

const contentType = (type, isRequired) =>
  validate({ type, field: 'content-type', isRequired })
    .equals('application/json')
    .withMessage('incorrect content type');

const username = (type, isRequired) =>
  validate({ type, field: 'username', isRequired, min: 2, max: 50 })
    .trim()
    .matches(/^[a-zA-Z](['-](?!['-])|[a-zA-Z0-9])*[a-zA-Z0-9]$/)
    .withMessage('invalid username');

const displayName = (type, isRequired) =>
  validate({ type, field: 'displayName', isRequired, min: 2, max: 50 })
    .trim()
    .matches(/^[a-zA-Z](['-](?!['-])|\s[a-zA-Z]|[a-zA-Z0-9])*[a-zA-Z0-9]$/)
    .withMessage('invalid display name');

const firstName = (type, isRequired) =>
  validate({ type, field: 'firstName', isRequired, min: 2, max: 50 })
    .trim()
    .matches(/^[A-Z](['-](?!['-])|[a-z])*[a-z]$/)
    .withMessage('invalid first name');

const lastName = (type, isRequired) =>
  validate({ type, field: 'lastName', isRequired, min: 2, max: 50 })
    .trim()
    .matches(/^[A-Z](['-](?!['-])|[a-z])*[a-z]$/)
    .withMessage('invalid last name');

const email = (type, isRequired) =>
  validate({ type, field: 'email', isRequired, max: 100 })
    .trim()
    .isEmail()
    .withMessage('invalid email address');

const password = (type, isRequired) =>
  validate({ type, field: 'password', isRequired, min: 8, max: 40 })
    .trim()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
      'i'
    )
    .withMessage(
      'must include one lowercase character, one uppercase character, a number, and a special character.'
    )
    .bail()
    .custom((value, { req }) => {
      if (req.body.confirmPassword) {
        if (value !== req.body.confirmPassword) {
          throw new Error("Passwords don't match");
        }
      }
      return value;
    });

const confirmPassword = (type, isRequired) =>
  validate({ type, field: 'confirmPassword', isRequired, min: 8, max: 40 });

exports.check = {
  contentType,
  username,
  displayName,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  res,
};
