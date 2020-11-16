const express = require('express');
const { auth } = require('./controllers/auth');
const { callback } = require('./controllers/callback');

const GoogleRouter = express.Router();

GoogleRouter.get('/', auth);
GoogleRouter.get('/callback', callback);

exports.GoogleRouter = GoogleRouter;
