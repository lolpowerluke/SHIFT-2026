import db from "../config/db.js";
import env from "../utils/env.js";
import { randomBytes } from 'crypto';
import validator from 'validator';
import { transporter } from "../utils/mailer.js";

const mailSignUp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email.'
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email.'
      });
    }
    const [result] = await db.query(
      'SELECT token FROM users WHERE email = ?',
      [email]
    );
    let token;
    if (result.length > 0) {
      token = result[0].token;
    } else {
      token = randomBytes(32).toString('hex');
      await db.query(
        `INSERT INTO users (email, token)
        VALUES(?, ?)`,
        [email, token]
      );
    }
    const confirmUrl = `${env.frontend.url}/pages/confirm?token=${token}`;
    // send email with link to mailConfirm function
    const info = await transporter.sendMail({
      from: 'info@shiftfestival.be',
      to: email,
      subject: 'Confirm signup',
      text: `Click to confirm:\n${confirmUrl}\n\nYou can safely ignore this if you didn't subscribe.`,
      html: `<p>Click <a href="${confirmUrl}">here</a> to confirm</p><p>You can safely ignore this if you didn't subscribe.`
    })
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Sign up for mail failed",
      error: error.message
    });
  }
}
const mailConfirm = async (req, res) => {
  try {
    const { token } = req.query;
    const [result] = await db.query(
      'SELECT status FROM users WHERE token = ?',
      [token]
    );
    if (result.length == 0) {
      res.status(400).json({
        success: false,
        message: "Invalid token"
      })
    }
    if (result[1].status == 'confirmed') {
      res.status(400).json({
        success: false,
        message: "Mail is already signed up!"
      });
    }
    await db.query(
      `UPDATE users SET status = 'confirmed'
      WHERE token = ?`,
      [token]
    );
    res.status(200).json({ success: true })
  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm signup",
      error: error.message
    });
  }
}
const mailCancel = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email."
      });
    }
    const [result] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email doesn't exist in database"
      });
    }
    const [deleteResult] = await db.query(
      'DELETE FROM users WHERE email = ?',
      [email]
    )
    res.send('Succesfully cancelled email subscription')
  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel email subscription',
      error: error.message
    });
  }
}

export {
  mailCancel,
  mailConfirm,
  mailSignUp
}
