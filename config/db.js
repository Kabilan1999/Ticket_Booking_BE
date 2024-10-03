const mongoose = require("mongoose");
const connectToASKDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/ASK_Ticket_Booking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
module.exports = connectToASKDb;
