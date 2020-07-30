const express = require('express');
const ApiAuthRouter = express.Router();
const getAuthInfoController = require('./get-auth-info/get-auth-info-controller');
const logoutController = require('./logout/logout-controller');

ApiAuthRouter.get('/', getAuthInfoController);

ApiAuthRouter.get('/logout', logoutController);

module.exports = ApiAuthRouter;
