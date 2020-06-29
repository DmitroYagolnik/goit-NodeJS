require = require("esm")(module);

import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

/* Модуль "dotenv" не було встановлено, з метою,
щоб можна було б перевірити роботу БД,
використовуючи пароль розробника.
Крім того, зайти в БД можна з будь-якого IP */

import contactRouter from "./contact/contact.router";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
};

const startServer = async () => {
  const DB_URI =
    "mongodb+srv://GOIT_user:tuHjugAtB4qvLFyf@cluster0-m6glh.mongodb.net/db-contacts?retryWrites=true&w=majority";
  try {
    await mongoose.connect(DB_URI, {
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database connection successful");

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(morgan("combined"));
    app.use("/api/contacts", contactRouter);

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT} port`);
    });
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

startServer();
