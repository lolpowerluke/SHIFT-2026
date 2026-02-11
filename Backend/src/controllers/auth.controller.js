import { generateToken } from "../utils/jwt.js";
import db from "../config/db.js";

const register = async () => {
  try {
    const { email, ticket } = req.body;
    if (!email, !ticket) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and ticket.'
      });
    }
    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }
    const [existingTickets] = await db.query(
      'SELECT id FROM users WHERE ticket = ?',
      [ticket]
    );
    if (existingTickets.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ticket already exists'
      });
    }
    const [result] = await db.query(
      'INSERT INTO users (email, ticket, created_at) VALUES (?, ?, NOW())',
      [email, ticket]
    );
    const userID = result.insertId;
    const token = generateToken({
      id: userID,
      email: email,
    })
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
}

export {
  register
}
