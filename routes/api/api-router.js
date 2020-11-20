const express = require('express');
const { AuthRouter } = require('./auth/auth-router');
const { contactUs } = require('./api-contact-us');

const ApiRouter = express.Router();

ApiRouter.use('/auth', AuthRouter);
ApiRouter.post('/contactUs', contactUs);

exports.ApiRouter = ApiRouter;
