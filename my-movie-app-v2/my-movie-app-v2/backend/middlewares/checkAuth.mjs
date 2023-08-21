import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const { JWT_SECRET } = process.env;

export const checkAuth = async (req, res, next) => {
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
    user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "invalid token",
      });
    }
    req.currentuser = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "invalid token",
    });
  }
};
export const restrictTo = (...role) => {
  return (req, res, next) => {
    console.log(req.currentuser);
    if (!role.includes(req.currentuser.role)) {
      return res.status(403).json({
        status: "fail",
        message: "forbidden",
      });
    }
    next();
  };
};
