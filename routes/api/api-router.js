const express = require('express');
const { AuthRouter } = require('./auth/auth-router');

const ApiRouter = express.Router();

ApiRouter.use('/auth', AuthRouter);

exports.ApiRouter = ApiRouter;
