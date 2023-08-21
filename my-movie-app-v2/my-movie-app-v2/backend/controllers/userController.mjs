import User from "../models/User.mjs";
import Authenticator from "../helpers/encrypt.mjs";

class userController {
  static async signUp(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const haspassword = Authenticator.encryptPassword(password);
      const newusername = Authenticator.usernameGenerator(email);
      const newUser = await User.create({
        name,
        username: newusername,
        email,
        role,
        password: haspassword,
      });

      const token = Authenticator.generateToken({
        id: newUser._id,
      });
      res.status(201).json({
        status: "success",
        data: {
          newUser,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "something went wrong",
      });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !Authenticator.comparePassword(password, user.password)) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    const token = await Authenticator.generateToken({
      id: user._id,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  }
}
export default userController;
