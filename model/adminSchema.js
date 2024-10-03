const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, immutable: true },
  modifiedAt: { type: Date, default: () => Date.now() },
});
// adminSchema.virtual("fullName").get(function () {
//   return `Mr. ${this.name}`;
// });
// Create a model
const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
