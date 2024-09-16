const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

const extractToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw customError("No Token Provided", 401);
  }

  return authHeader.split(" ")[1];
};

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    const token = extractToken(req.headers.authorization);

    const payLoad = jwt.verify(token, process.env.JWT_SECRETE);

    req.user = { userId: payLoad.userId };
  } catch (error) {
    return next(customError("Unauthorized", 401));
  }
};

module.exports = auth;
