const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewControllers = require("../controllers/reviews");

// route for creating a review for a listing
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));

//route for deleting a review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewControllers.destroyReview));

module.exports = router;
