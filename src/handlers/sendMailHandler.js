const Mail = require("../models/Mail");
const { autoResponse } = require("../utils/autoResponder");
const { mailer } = require("../utils/mailer");

const sendMail = async (req, res) => {
  const { email, name, msg } = req.body;

  if (!email || !name || !msg)
    return res.status(400).json({ message: "Invalid form data!" });

  try {
    const newMailInfo = {
      email: email,
      name: name,
      message: msg,
      createdAt: new Date(),
    };

    await Mail.create(newMailInfo);

    const subject = "New Contact Info";
    const admMail = process.env.ADMIN_EMAIL;
    const mailMsg = `${name}\n${email}\n${msg}`;

    await mailer(admMail, subject, mailMsg);

    await autoResponse(email);

    res.status(200).json({ message: "Message sent succesfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured. Please try again later" });
  }
};

module.exports = { sendMail };
