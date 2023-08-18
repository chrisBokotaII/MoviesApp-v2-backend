import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const { JWT_SECRET } = process.env;

const checkAuth = async (req, res, next) => {
  let user;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "no token",
    });
  }
  try {
    let decoded = jwt.verify(token, JWT_SECRET);
    user = User.findById({ _id: decoded._id });
    if (!user || !decoded) {
      return res.status(401).json({
        status: "fail",
        message: "authorization failed",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "invalid token",
    });
  }
};
export default checkAuth;
