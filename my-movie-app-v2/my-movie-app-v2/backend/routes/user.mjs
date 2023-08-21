import Express from "express";
import userController from "../controllers/userController.mjs";
import UserValidator from "../middlewares/validations/user.mjs";
import asyncHadller from "../middlewares/asycHadller.mjs";
import checkeUser from "../middlewares/checkUser.mjs";
const router = Express.Router();

router.post(
  "/signup",
  UserValidator.singnUp,
  asyncHadller(checkeUser),
  asyncHadller(userController.signUp)
);
router.post(
  "/login",
  asyncHadller(UserValidator.login),
  asyncHadller(userController.login)
);

export default router;
