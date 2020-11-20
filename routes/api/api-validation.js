const { validate, res } = require('../../utils/validation');

const contentType = (type, isRequired) =>
  validate({ type, field: 'content-type', isRequired })
    .equals('application/json')
    .withMessage('incorrect content type');

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

const message = (type, isRequired) =>
  validate({ type, field: 'message', isRequired, min: 2, max: 800 })
    .trim()
    .matches(/^[^\\]+$/)
    .withMessage('backslash not allowed');

exports.check = { contentType, firstName, lastName, email, message, res };
