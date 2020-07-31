const express = require('express');
const ApiAuthGoogleRouter = express.Router();
const passport = require('passport');
const callbackController = require('./callback/callback-controller');

ApiAuthGoogleRouter.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

ApiAuthGoogleRouter.get(
  '/callback',
  callbackController.onResponse,
  callbackController.findUser,
  callbackController.createUser,
  callbackController.login
);

module.exports = ApiAuthGoogleRouter;
