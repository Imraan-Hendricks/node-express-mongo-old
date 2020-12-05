const express = require('express');
const { register } = require('./local-register');

const LocalRouter = express.Router();

LocalRouter.post('/', register);

exports.LocalRouter = LocalRouter;
