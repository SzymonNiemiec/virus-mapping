var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'med.manager.poland@gmail.com',
    pass: 'Gatech2020'
  }
});

const emailService = {
  sendEmail: async (mailOptions) => {
      mailOptions.from = 'med.manager.poland@gmail.com'
      return transporter.sendMail(mailOptions)
  }
}

module.exports = emailService
