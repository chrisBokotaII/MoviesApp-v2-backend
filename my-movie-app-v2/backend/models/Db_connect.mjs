import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB_URL } = process.env;
class Db_connect {
  static async connect() {
    try {
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("database connected");
    } catch (error) {
      console.log(error);
    }
  }
}

export default Db_connect;
