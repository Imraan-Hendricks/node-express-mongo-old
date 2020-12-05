const express = require('express');
const { login } = require('./local-login');
const { register } = require('./local-register');

const LocalRouter = express.Router();

LocalRouter.post('/login', login);
LocalRouter.post('/', register);

exports.LocalRouter = LocalRouter;
