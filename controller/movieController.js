const movieModel = require("../model/movieSchema");
const successMessage = {
  status: "Success",
  data: {},
  errorCode: 200,
};
const errorMessage = {
  status: "Failure",
  errorMessage: "",
  errorCode: 400,
};

const getAllMovies = async (req, res) => {
  try {
    let movies = await movieModel.find();
    res.status(200).json({ ...successMessage, data: movies });
  } catch (error) {
    res.status(404).json({ ...errorMessage, errorMessage: error.message });
  }
};

module.exports = { getAllMovies };
