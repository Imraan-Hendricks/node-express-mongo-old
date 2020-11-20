const { check } = require('./api-validation');
const { MAIL_TO } = require('../../config/env');
const { transporter } = require('../../config/nodemailer');

const validation = [
  check.contentType('header', true),
  check.firstName('body', true),
  check.lastName('body', true),
  check.email('body', true),
  check.message('body', true),
  check.res,
];

const contactUs = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const html = `
    <div>
      <p>${message}</p>
      <hr />
      <ul>
        <li>First name: ${firstName}</li>
        <li>Last name: ${lastName}</li>
        <li>Email: ${email}</li>
      </ul>
      <hr />
    </div>`;

  try {
    await transporter.sendMail({
      from: `${firstName} ${lastName} <${email}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: 'Enquiry',
      html: html,
    });

    res.json({
      success: true,
      data: {
        firstName,
        lastName,
        email,
        message,
      },
    });
  } catch {
    res.json({
      success: false,
      err: [
        {
          location: 'nodemailer',
          param: '',
          msg: 'Email failed. Please try again',
          value: '',
        },
      ],
    });
  }
};

exports.contactUs = [...validation, contactUs];
