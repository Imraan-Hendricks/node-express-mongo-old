const { check } = require('./api-validation');
const { handle } = require('../../utils/common');
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

const contactUs = async (firstName, lastName, email, message) => {
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

  const mailOptions = {
    from: `${firstName} ${lastName} <${email}>`,
    to: MAIL_TO,
    replyTo: email,
    subject: 'Enquiry',
    html,
  };

  const { 1: err } = await handle(transporter.sendMail(mailOptions));

  if (err)
    throw [
      {
        location: 'nodemailer',
        param: '',
        msg: 'Email failed. Please try again',
        value: '',
      },
    ];

  return { firstName, lastName, email, message };
};

const handleContactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    const data = await contactUs(firstName, lastName, email, message);
    res.json({ succuss: true, data });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.contactUs = [...validation, handleContactUs];
