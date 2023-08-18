import Movie from "../models/Movie.mjs";
import { ObjectId } from "mongodb";

class movieController {
  static async getAllMovies(req, res) {
    const movies = await Movie.find();
    res.status(200).json({
      status: "success",
      results: movies.length,
      data: {
        movies,
      },
    });
  }
  static async getOneMovie(req, res) {
    let query = { _id: new ObjectId(req.params.id) };
    const movie = await Movie.findOne(query);
    if (!movie) {
      return res.status(404).json({
        status: "fail",
        message: "Movie not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  }

  static async createMovie(req, res) {
    const { title, description, genre, director, cast, cover } = req.body;
    const movie = await Movie.create({
      title,
      description,
      genre,
      director,
      cast,
      cover,
    });
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  }

  static async updateMovie(req, res) {
    const { title, description, genre, director, cast, cover } = req.body;
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        title,
        description,
        genre,
        director,
        cast,
        cover,
      },
    };
    const movie = await Movie.updateOne(query, update);
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  }

  static async deleteMovie(req, res) {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await Movie.deleteOne(query);
    res.status(204).json({
      status: "success",
      result,
    });
  }
}
export default movieController;
