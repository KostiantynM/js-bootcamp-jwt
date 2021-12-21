const jwt = require("jsonwebtoken");
const { ForbiddenError } = require('./error');

const config = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      throw ForbiddenError({
        userMessage: "A token is required for authentication",
        data: {
          actions: [
            'Plz check API contract https://some-very-cool-api.com/api/wiki#authorization',
            'Plz check x-access-token request header'
          ]
        }
      });
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = verifyToken;