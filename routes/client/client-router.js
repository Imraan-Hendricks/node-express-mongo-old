const express = require('express');
const { NODE_ENV } = require('../../config/env');
const path = require('path');

const ClientRouter = express.Router();
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

exports.ClientRouter = ClientRouter;
