import db from "../config/db.js";

const register = async (req, res) => {
  try {
    res.send("TODO")
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
}

const login = async (req, res) => {
  try {
    res.send("TODO");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
}

export {
  register
}
