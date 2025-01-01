
const express = require("express");
const app = express();
const mongoose = require("mongoose"); // connect with database
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const flash = require('connect-flash');



const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // MongoDB URL from mongoose

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() { // to connect with database
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static (path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode", // Use a secure secret in production
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
};


// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});


app.use(session(sessionOptions));
app.use(flash());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



app.all("*", (req, res, next) => {
  next( new ExpressError(404, "Page Not Found"));
});


// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Start the server
app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});



