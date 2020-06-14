const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var fs = require("fs");
var path = require("path");

// Файл, для збереження історії запитів
const accessLogPath = path.join(__dirname, "db", "access.log");
const accessLogStream = fs.createWriteStream(accessLogPath, {
  flags: "a",
});

const { contactRouter } = require("./contact/contact.router");

const app = express();

const PORT = 3000;
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/contacts", contactRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
});
