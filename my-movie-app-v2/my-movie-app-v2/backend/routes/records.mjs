import Express from "express";
import { checkAuth, restrictTo } from "../middlewares/checkAuth.mjs";
import asyncHadller from "../middlewares/asycHadller.mjs";
import movieController from "../controllers/movieController.mjs";
import checkMovie from "../middlewares/checkMovie.mjs";

const router = Express.Router();

router.get(
  "/movies",
  asyncHadller(checkAuth),
  asyncHadller(movieController.getAllMovies)
);
router.post(
  "/addmovie",
  asyncHadller(checkAuth),
  restrictTo("admin"),
  asyncHadller(movieController.createMovie)
);
router.get(
  "/movies/:id",
  asyncHadller(checkAuth),
  asyncHadller(restrictTo("admin")),
  asyncHadller(movieController.getOneMovie)
);
router.patch(
  "/movies/:id",
  asyncHadller(checkAuth),
  asyncHadller(restrictTo("admin")),
  asyncHadller(movieController.updateMovie)
);
router.delete(
  "/movies/:id",
  asyncHadller(checkAuth),
  asyncHadller(restrictTo("admin")),
  asyncHadller(checkMovie),
  asyncHadller(movieController.deleteMovie)
);
export default router;
