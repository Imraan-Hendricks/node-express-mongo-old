const express = require('express');
const ApiAuthRouter = express.Router();
const getAuthInfoController = require('./get-auth-info/get-auth-info-controller');
const logoutController = require('./logout/logout-controller');

ApiAuthRouter.use('/google', require('./google/google'));

ApiAuthRouter.get('/', getAuthInfoController);

ApiAuthRouter.get('/logout', logoutController);

module.exports = ApiAuthRouter;
