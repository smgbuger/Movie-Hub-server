require("dotenv").config(); //

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

//import routes to app.js frm authRouter
const authRouter = require("./routes/authRouter"); // middleware for auth page
const movieRouter = require("./routes/movieRouter"); // midleware for movie router
const bookmarkRouter = require("./routes/bookmarkRouter"); // midleware for bookmark router
const error = require("./middlewares/error"); //imported middleware

const app = express();

const port = 4000;

app.use(cors());

//a middleware that allow access to the req.body on all request(Without this you cant test on postman)
app.use(express.json());

//middlesware for login and register authentication router
app.use("/api/auth", authRouter);

app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

// custom middleware for erros
app.use(error); //import the error for middleware into the app.js

//start listening on a given port and run the callback function when invoked
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");

    await app.listen(port, () => {
      console.log(`Server is runing on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};
start();
//francisokagbue3
//9s2aBm4AngPOxAsf
//mongodb+srv://francisokagbue3:9s2aBm4AngPOxAsf@cluster0.btwow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
