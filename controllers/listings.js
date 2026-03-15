const Listing = require('../models/listing');
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60";

const buildImageData = (file) => {
    if (!file) {
        return {
            url: DEFAULT_IMAGE_URL,
            filename: "default-listing-image",
        };
    }

    return {
        url: file.path,
        filename: file.filename,
    };
};

module.exports.index = async(req,res)=>{
    const allList = await Listing.find({});
    res.render("listings/index.ejs",{allList});
};

module.exports.new = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.show = async (req,res)=>{
    const {id} = req.params;
    const list = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if(!list){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
};

module.exports.addNewListing = async(req,res)=>{
    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = buildImageData(req.file);
    await newList.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

module.exports.edit = async(req,res)=>{
    const {id} = req.params;
    const list = await Listing.findById(id);
    if(!list){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
};

module.exports.update = async(req,res)=>{
    const {id} = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
        new: true,
        runValidators: true,
    });

    if(!updatedListing){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if(req.file){
        updatedListing.image = buildImageData(req.file);
        await updatedListing.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};
