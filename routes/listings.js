const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const { isLoggedIn, validateListing, isOwner } = require("../middleware");
const controllersListings = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// index route
router.get("/", wrapAsync(controllersListings.index));

// create route
router.get("/new", isLoggedIn, controllersListings.new);

// show route
router.get("/:id", wrapAsync(controllersListings.show));

// add new listing route
router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(controllersListings.addNewListing));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(controllersListings.edit));

// update route
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(controllersListings.update));

// delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(controllersListings.destroy));

module.exports = router;
