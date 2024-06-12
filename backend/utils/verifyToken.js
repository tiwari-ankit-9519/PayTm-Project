const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = verifyToken;
