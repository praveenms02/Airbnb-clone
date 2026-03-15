const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().optional(),
        image: joi.string().uri().allow("", null),
        price: joi.number().positive().required(),
        location: joi.string().min(0).required(),
        country: joi.string().required()
    })
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().trim().required(),
        rating: joi.number().integer().min(1).max(5).required(),  
    })
});
