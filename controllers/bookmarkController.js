const Movie = require("../models/movies");

const customError = require("../utils/customError");

//============controller to find all the bookedmarked movies======

const allBookmarks = async (req, res) => {
  const { userId } = req.user;
  const bookmarks = await Movie.find({ bookmarkBy: userId });
  res.status(200).json({ data: bookmarks });
};

//=======controller to add a movie to bookmarks

const addBookmark = async (req, res, next) => {
  const { id } = req.params;

  const { userId } = req.user;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $push: { bookmarkBy: userId } }
    );

    if (!movie) {
      return next(customError(`No Movie with ID: ${id}`, 400));
    }
    res.status(200).json({ message: "Movie Bookmarked!" });
  } catch (error) {
    next(error);
  }
};

// ==========controller to remove a movie from bookmarks==

const removeBookmark = async (req, res, next) => {
  const { id } = req.params;

  const { userId } = req.user;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $pull: { bookmarkedBy: userId } }
    );

    if (!movie) {
      return next(customError(`No Movie with ID: ${id}`, 400));
    }
    res.status(200).json({ message: "Bookmark Removed!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
