const express = require('express');
const ApiAuthRouter = express.Router();
const getAuthInfoController = require('./get-auth-info/get-auth-info-controller');

ApiAuthRouter.get('/', getAuthInfoController);

module.exports = ApiAuthRouter;
