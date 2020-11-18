const nodemailer = require('nodemailer');
const {
  NODEMAILER_USER,
  NODEMAILER_CLIENT_ID,
  NODEMAILER_CLIENT_SECRET,
  NODEMAILER_REFRESH_TOKEN,
  NODEMAILER_ACCESS_TOKEN,
} = require('./env');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    type: 'OAuth2',
    user: NODEMAILER_USER,
    clientId: NODEMAILER_CLIENT_ID,
    clientSecret: NODEMAILER_CLIENT_SECRET,
    refreshToken: NODEMAILER_REFRESH_TOKEN,
    accessToken: NODEMAILER_ACCESS_TOKEN,
  },
});
