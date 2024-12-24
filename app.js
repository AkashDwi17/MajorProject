const express = require("express");
const app = express();
const mongoose = require("mongoose"); // connect with database
const Listing = require("./models/listing.js");

// Commented out the line that causes the error
// const sampleListings = require("../init/data.js");

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

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// // Test route to create a sample listing
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("Successful testing");
// });

// Start the server
app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
