const express = require('express');
const { AuthRouter } = require('./auth/auth-router');
const { contactUs } = require('./controllers/contact-us');

const ApiRouter = express.Router();

ApiRouter.use('/auth', AuthRouter);
ApiRouter.post('/contactUs', contactUs);

exports.ApiRouter = ApiRouter;
