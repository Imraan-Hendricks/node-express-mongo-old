const express = require('express');
const ApiAuthGoogleRouter = express.Router();
const { callbackController } = require('./controllers/callback');
const { googleAuthController } = require('./controllers/google-auth');

ApiAuthGoogleRouter.get('/', googleAuthController);
ApiAuthGoogleRouter.get('/callback', callbackController);

module.exports = ApiAuthGoogleRouter;
