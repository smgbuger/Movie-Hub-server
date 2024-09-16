const express = require("express");

const methodNotAllowed = require("../utils/methodNotAllowed");

const {
  allShows,
  allSeries,
  allMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(allShows).all(methodNotAllowed);
router.route("/series").get(allSeries).all(methodNotAllowed);
router.route("/movies").get(allMovie).all(methodNotAllowed);

module.exports = router;
