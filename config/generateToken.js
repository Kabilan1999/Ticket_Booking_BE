const jwt = require("jsonwebtoken");
const { texts } = require("./constants/text");
const generateToken = (user) =>
  jwt.sign({ id: user.id }, texts.KEY.SECRET_KEY, {
    expiresIn: "2m",
  });

module.exports = generateToken;
