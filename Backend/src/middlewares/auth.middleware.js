import { verifyToken } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        succes: false,
        message: 'No token provided'
      })
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      succes: false,
      message: error || 'Authentication failed'
    })
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient permissions'
      });
    }
    next();
  }
}

export {
  authenticate,
  authorize
}
