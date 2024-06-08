const getTokenFromHeader = require("../utils/getTokenFromHeader.js");
const verifyToken = require("../utils/verifyToken.js");

const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    return res.status(403).json({
      message: "User not authenticated",
    });
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};

module.exports = isLoggedIn;
