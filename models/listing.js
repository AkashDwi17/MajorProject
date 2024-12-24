const mongoose = require ("mongoose");
const Schema =  mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    
    discription: String,

    image: {   //mongoose - Schema - virtual - get/set  - use set
        type: String,
        default: // image ka option hi nahi set kia hua hai
            "https://unsplash.com/photos/a-couple-of-people-that-are-standing-in-the-grass-tQ7Cxafk2KU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
        set: (v) => v === "" 
            ? "https://unsplash.com/photos/a-couple-of-people-that-are-standing-in-the-grass-tQ7Cxafk2KU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash"
            : v,  // image hai lekin uski url empty hai
    },
    price: Number,
    location: String,
    country: String,
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
