const { body, cookie, header, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const setChain = (type, field) => {
  if (type === 'body') return body(field);
  if (type === 'cookie') return cookie(field);
  if (type === 'header') return header(field);
  if (type === 'param') return param(field);
  if (type === 'query') return query(field);
  return check(field);
};

const setDefault = (chain, defaultValue) => {
  if (defaultValue === undefined) return;
  chain.customSanitizer((value) => {
    if (value === undefined) return defaultValue;
    return value;
  });
};

const required = (chain, isRequired) => {
  if (isRequired === true) {
    chain.notEmpty().withMessage('required').bail();
    return;
  }

  chain.if((value) => {
    if (value === undefined) return false;
    return true;
  });
};

const length = (chain, min, max) => {
  chain.isLength({ min }).withMessage('too short!').bail();
  chain.isLength({ max }).withMessage('too long!').bail();
};

const parseJson = (chain, toJson) => {
  if (toJson !== true) return;
  chain.isJSON().withMessage('must be json').bail();
  chain.customSanitizer((value) => JSON.parse(value));
};

exports.validate = (options) => {
  const { type, field, defaultValue, isRequired, min, max, toJson } = options;
  const chain = setChain(type, field);
  setDefault(chain, defaultValue);
  required(chain, isRequired);
  length(chain, min, max);
  parseJson(chain, toJson);
  return chain;
};

exports.res = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  res.json({ success: false, err: errors.array() });
};
