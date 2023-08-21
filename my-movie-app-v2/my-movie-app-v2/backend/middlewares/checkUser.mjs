import User from "../models/User.mjs";
const checkeUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({
      status: "fail",
      message: "user already exist",
    });
  }

  next();
};
export default checkeUser;
