import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    cast: {
      type: String,
      required: [true, "Cast is required"],
    },
    cover: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Movie", movieSchema);
