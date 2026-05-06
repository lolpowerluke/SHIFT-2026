import nodemailer from "nodemailer";
import env from "./env.js";

const transporter = nodemailer.createTransport({
  host: 'smtp-auth.mailprotect.be',
  port: 587,
  secure: false,
  auth: {
    user: env.mail.mail,
    pass: env.mail.pass,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// Optional: verify connection on startup
transporter.verify((err, success) => {
  if (err) console.error('Mail transport error:', err);
  else console.log('Mail transport ready');
});

export {
  transporter
}
