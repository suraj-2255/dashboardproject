const jwt = require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("token", token);
    if (token) {
      token = token.split(" ")[1];
      const decodedToken = jwt.verify(token, secretKey);
      req.user = {
        id: decodedToken.id,
        email: decodedToken.Email,
      };
      next();
    } else {
      res.status(401).json({ message: "unautherized token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = authMiddleware