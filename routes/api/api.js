const express = require('express');
const ApiRouter = express.Router();

ApiRouter.use('/auth', require('./auth/auth'));

module.exports = ApiRouter;
