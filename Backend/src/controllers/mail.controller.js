import db from "../config/db.js";

const mailSignUp = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email.'
      });
    }
    const [result] = await db.query(
      'SELECT id FROM mailsignup WHERE email = ?',
      [email]
    );
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in database'
      });
    }
    // send email with link to mailConfirm function
    res.send("OK");
  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: 'Sign up for mail failed',
      error: error.message
    });
  }
}
async function mailConfirm() {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email.'
      });
    }
    const [result] = await db.query(
      'SELECT id FROM mailsignup WHERE email = ?',
      [email]
    );
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in database'
      });
    }
    const [insertResult] = await db.query(
      'INSERT INTO mailsignup (email) VALUES (?)',
      [email]
    )
    res.status(200).json({
      success: true,
      message: 'Succesfully sign up for emails'
    })
  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm signup',
      error: error.message
    });
  }
}
async function mailCancel() {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email.'
      });
    }
    const [result] = await db.query(
      'SELECT id FROM mailsignup WHERE email = ?',
      [email]
    );
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email doesn't exist in database"
      });
    }
    const [deleteResult] = await db.query(
      'DELETE FROM mailsignup WHERE email = ?',
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
