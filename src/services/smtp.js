require("dotenv").config();
const nodemailer = require("nodemailer")

const smtp = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: Number(process.env.MAIL_SECURE),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

/* smtp.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("A conexão com o servidor SMTP está funcionando corretamente.");
  }
});
 */



module.exports = smtp