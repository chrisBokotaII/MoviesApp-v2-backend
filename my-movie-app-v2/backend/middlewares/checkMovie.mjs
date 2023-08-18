import Movie from "../models/Movie.mjs";

const checkMovie = async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "Movie not found",
    });
  }

  next();
};
export default checkMovie;
