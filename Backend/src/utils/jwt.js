import jwt from "jsonwebtoken"
import env from "./env.js"

const generateToken = (payload, expiresIn = env.jwt.expiresIn) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: expiresIn
  })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

const decodeToken = (token) => {
  return jwt.decode(token);
}

export {
  generateToken,
  verifyToken,
  decodeToken
}
