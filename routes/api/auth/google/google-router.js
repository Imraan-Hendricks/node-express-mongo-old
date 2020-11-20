const express = require('express');
const { auth } = require('./google-auth');
const { callback } = require('./google-callback');

const GoogleRouter = express.Router();

GoogleRouter.get('/', auth);
GoogleRouter.get('/callback', callback);

exports.GoogleRouter = GoogleRouter;
