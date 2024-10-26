const express = require("express");
const router = express.Router();
const movieController = require("../../controller/movieController");
const verifyToken = require("../../middleware/verifyToken");

router.route("/").get(verifyToken, movieController.getAllMovies);

module.exports = router;
