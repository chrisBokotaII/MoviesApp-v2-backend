import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Database from "./models/Db_connect.mjs";
import user from "./routes/user.mjs";
import movie from "./routes/records.mjs";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
//database connection
Database.connect();

//routes
app.use("/api/v2/auth", user);
app.use("/api/v2/auth", movie);
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.listen(3000, () => {
  console.log("server is running");
});

export default app;
