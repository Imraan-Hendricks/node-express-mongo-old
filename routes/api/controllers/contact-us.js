const { MAIL_TO } = require('../../../config/env');
const { transporter } = require('../../../config/nodemailer');

exports.contactUs = async (req, res) => {
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
