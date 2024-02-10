const { mailer } = require("./mailer");

const autoResponse = async (email) => {
  const subject = `Thank you for contacting VulpesCode!`;
  const message = `<p>Thank you for reaching out to me.</p> <br> <p>Your message has been received, and I appreciate you taking the time to get in touch</p>.

    <p>I will personally review your message and get back to you as soon as possible. In the meantime, feel free to explore VulpesCode website for more information about my services and projects.</p><br> 
    
    <p>If you have any further questions or need immediate assistance, you can reach me directly at <b>${process.env.ADMIN_PHONE}.</b></p><br>
    
    <i>Thank you once again for reaching out to VulpesCode.</i>`;

  await mailer(email, subject, message);
};

module.exports = { autoResponse };
