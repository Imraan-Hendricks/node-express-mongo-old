const express = require('express');
const { GoogleRouter } = require('./google/google-router');
const { LocalRouter } = require('./local/local-router');
const { deleteUser } = require('./auth-delete-user');
const { getInfo } = require('./auth-get-info');
const { logout } = require('./auth-logout');

const AuthRouter = express.Router();

AuthRouter.use('/google', GoogleRouter);
AuthRouter.use('/local', LocalRouter);
AuthRouter.get('/', getInfo);
AuthRouter.get('/logout', logout);
AuthRouter.delete('/', deleteUser);

exports.AuthRouter = AuthRouter;
