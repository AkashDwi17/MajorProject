const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };


// Index Route
router.get("/",  wrapAsync (async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));
  
  //New Route
  router.get("/new", wrapAsync (async (req, res) => {
    res.render("listings/new.ejs");
  }));
  
  
  // Show Route
  router.get("/:id", wrapAsync (async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  }));


  // Create Route
  router.post("/", wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }));
  
  
  //Edit Route
  router.get("/:id/edit",  wrapAsync (async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  
  //Update Route
  router.put("/:id",  wrapAsync (async (req, res) => {
    if(!req.body.listing){
      throw new ExpressError(400, "Send valid data for listing");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });  
    res.redirect(`/listings/${id}`);
  }));
  
  
  
  // Delete Route
  router.delete("/:id", wrapAsync (async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");  
  }));


module.exports = router;