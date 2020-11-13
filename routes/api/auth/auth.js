const express = require('express');
const ApiAuthRouter = express.Router();
const { getAuthInfoController } = require('./controllers/get-auth-info');
const { logoutController } = require('./controllers/logout');

ApiAuthRouter.use('/google', require('./google/google'));
ApiAuthRouter.get('/', getAuthInfoController);
ApiAuthRouter.get('/logout', logoutController);

module.exports = ApiAuthRouter;
