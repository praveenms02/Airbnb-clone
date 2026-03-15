const Review = require("../models/review");
const Listing = require("../models/listing");
const ExpressError = require("../utils/expressError");

module.exports.createReview = async(req,res)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        throw new ExpressError(404,"Listing Not Found");
    }
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview._id);
    await listing.save();
    await newReview.save();
    req.flash("success", "Review added!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    const {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};