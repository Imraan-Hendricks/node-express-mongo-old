const express = require('express');
const ClientRouter = express.Router();
const { NODE_ENV } = require('../../config/env');
const path = require('path');

const clientPath = path.join(__dirname, '../../../client/build');

ClientRouter.get(
  '*',
  (req, res, next) => {
    if (NODE_ENV !== 'production')
      return res.redirect('http://localhost:3000' + req.originalUrl);

    next();
  },
  express.static(clientPath),
  (req, res) => res.sendFile(clientPath)
);

module.exports = ClientRouter;
