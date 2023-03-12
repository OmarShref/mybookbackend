require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// starting server
const app = express();
// setting the port
const port = process.env.PORT || 7000;
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Mongodb Connect
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_STRING, {})
  .then(console.log("connected to db successfully"))
  .catch((err) => console.log(err));

// Routes
const booksRouter = require("./routes/books");
app.use("/", booksRouter);

app.listen(port);
console.log(`server is working on : http://localhost:${port}`);
