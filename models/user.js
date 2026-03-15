const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const passportLocalMongoosePlugin = passportLocalMongoose.default || passportLocalMongoose;

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// adds username and password fields, and some methods for authentication
userSchema.plugin(passportLocalMongoosePlugin);

module.exports = mongoose.model("User", userSchema);
