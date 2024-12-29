const mongoose = require ("mongoose");
const Schema =  mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    
    discription: String,

    image: {   //mongoose - Schema - virtual - get/set  - use set
        type: String,
        default: // image ka option hi nahi set kia hua hai

            "https://images.unsplash.com/photo-1731432247068-8f7a97773aee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        
            set: (v) => v === "" 

            ? "https://images.unsplash.com/photo-1731432247068-8f7a97773aee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            : v,  // image hai lekin uski url empty hai
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

listingSchema.post("findOneAndDelete", async  (listing) => {
    if (listing) {await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


