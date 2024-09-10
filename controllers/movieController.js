const Movie = require("../models/movies");

//===========CONTROLLER fto find all shows================
const allShows = async (req, res) => {
  const shows = await Movie.find({});
  res.status(200).json({ shows: shows });
};

//============controller to find only all the series====
const allSeries = async (req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({ shows: series });
};

//===========controller  to find only all the movie=====
const allMovie = async (req, res) => {
  const movies = await Movie.find({ type: "movie" });
  res.status(200).json({ shows: movies });
};

module.exports = { allShows, allSeries, allMovie };
