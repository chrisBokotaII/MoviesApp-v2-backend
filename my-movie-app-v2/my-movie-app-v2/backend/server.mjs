import Express from "express";
import Db_connect from "./models/Db_connect.mjs";
import router from "./routes/user.mjs";
const app = Express();
app.use(Express.json());
Db_connect.connect();

app.use("/api/v2", router);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});
export default app;
