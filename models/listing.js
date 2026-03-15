const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review");
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image:{
        url: {
            type: String,
            default: DEFAULT_IMAGE_URL,
        },
        filename: {
            type: String,
            default: "default-listing-image",
        },
    },
    price: {
        type: Number  
    },
    location: {
        type: String
    },
    country:{
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}); 

listingSchema.post("findOneAndDelete", async function(listing){
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
