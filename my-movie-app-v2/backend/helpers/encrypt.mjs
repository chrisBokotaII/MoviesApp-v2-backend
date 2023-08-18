import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

class Authenticator {
  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
  static generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "2d",
    });
  }
  static usernameGenerator(name) {
    return (
      String(name) + (+new Date() * Math.random()).toString().substring(0, 1)
    );
  }
}
export default Authenticator;
