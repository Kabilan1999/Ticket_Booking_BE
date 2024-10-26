const jwt = require("jsonwebtoken");
const adminModel = require("../model/adminSchema");
const { texts } = require("../config/constants/text");

const errorMessage = {
  status: "Failure",
  errorMessage: "",
  errorCode: 401,
};
const verifyToken = (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader) {
    res.status(401).json({
      ...errorMessage,
      errorMessage: "Missing Token",
    });
  }
  const token = authHeader?.split(" ")?.[1];
  console.log("token", token);

  jwt.verify(token, texts.KEY.SECRET_KEY, async (err, decode) => {
    if (err) {
      return res.status(403).json({
        ...errorMessage,
        errorCode: 403,
        errorMessage: "Invalid Token",
      });
    }
    const admin = await adminModel.findOne({ id: decode.id });
    if (!admin) {
      return res.status(404).json({
        ...errorMessage,
        errorCode: 404,
        errorMessage: "User not found",
      });
    }
    req.user = admin;
    next();
  });
};

module.exports = verifyToken;
