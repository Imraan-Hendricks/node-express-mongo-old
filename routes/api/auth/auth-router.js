const express = require('express');
const { GoogleRouter } = require('./google/google-router');
const { getInfo } = require('./auth-get-info');
const { logout } = require('./auth-logout');

const AuthRouter = express.Router();

AuthRouter.use('/google', GoogleRouter);
AuthRouter.get('/', getInfo);
AuthRouter.get('/logout', logout);

exports.AuthRouter = AuthRouter;
