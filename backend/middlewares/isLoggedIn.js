const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({
      message: "User not authenticated",
    });
  }

  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    return res.status(403).json({
      message: "User not authenticated",
    });
  } else {
    req.userAuthId = decodedUser.id;
    next();
  }
};

module.exports = isLoggedIn;
