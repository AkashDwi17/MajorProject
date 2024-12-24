const mongoose = require("mongoose");
const initData = require("./data.js"); // Ensure this file exports an array with proper data
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    // Preprocess data to ensure `image` is a string
    const preprocessedData = initData.data.map((listing) => {
      if (typeof listing.image === "object" && listing.image.url) {
        listing.image = listing.image.url; // Use the `url` property as the image value
      }
      return listing;
    });

    await Listing.deleteMany({});
    await Listing.insertMany(preprocessedData);
    console.log("data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  } finally {
    mongoose.connection.close();
  }
};

initDB();
