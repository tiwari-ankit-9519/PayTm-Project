const getTokenFromHeader = (req) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.split(" ")[1];
  }
  return null;
};

module.exports = getTokenFromHeader;
