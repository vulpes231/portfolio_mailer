const nodemailer = require("nodemailer");

const mailer = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "server223.web-hosting.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `
        <body>
          <div>
            ${message}
          </div>
        </body>
      `,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log(info);
      }
    }
  );

  //   console.log("Message sent: %s", info.messageId);
};

module.exports = { mailer };
