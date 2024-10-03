const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process?.env?.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const customCorsOptions = require("./config/corsOption");
const connectToASKDb = require("./config/db");
const app = express();

app.use(logger);
app.use(cors(customCorsOptions));
app.use(express.urlencoded({ extended: false })); // To handle form data
app.use(express.json()); // To handle json data
connectToASKDb();
app.use("/", express.static(path.join(__dirname, "./assets")));
app.use("/admin", require("./routes/api/admin"));
app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running in PORT:${PORT}`));
