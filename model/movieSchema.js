const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    unique: true,
  },
  releaseDatedate: {
    type: Date,
  },
  createdAt: { type: Date, immutable: true },
  modifiedAt: { type: Date, default: () => Date.now() },
});
// adminSchema.virtual("fullName").get(function () {
//   return `Mr. ${this.name}`;
// });
// Create a model
const movieModel = mongoose.model("movie", movieSchema);

module.exports = movieModel;
