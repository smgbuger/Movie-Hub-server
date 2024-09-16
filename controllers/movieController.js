const Movie = require("../models/movies");
const customError = require("../utils/customError");

//===========CONTROLLER fto find all shows================
const allData = async (req, res, next) => {
  try {
    const shows = await Movie.find({});
    res.status(200).json({ shows: shows });
  } catch (error) {
    next(customError("Error fetching all data", 500));
  }
};

//============controller to find only all the series====
const allSeries = async (req, res, next) => {
  try {
    const series = await Movie.find({ type: "series" });
    res.status(200).json({ shows: series });
  } catch (error) {
    next(customError("Error fetching series data", 500));
  }
};

//===========controller  to find only all the movie=====
const allMovie = async (req, res, next) => {
  try {
    const movies = await Movie.find({ type: "movie" });
    res.status(200).json({ shows: movies });
  } catch (error) {
    next(customError("Error fetching movies data", 500));
  }
};

module.exports = { allData, allSeries, allMovie };
