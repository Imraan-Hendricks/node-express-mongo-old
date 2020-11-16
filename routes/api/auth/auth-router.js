const express = require('express');
const { GoogleRouter } = require('./google/google-router');
const { getAuthInfo } = require('./controllers/get-auth-info');
const { logout } = require('./controllers/logout');

const AuthRouter = express.Router();

AuthRouter.use('/google', GoogleRouter);
AuthRouter.get('/', getAuthInfo);
AuthRouter.get('/logout', logout);

exports.AuthRouter = AuthRouter;
