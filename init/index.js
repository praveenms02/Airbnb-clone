const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initdata = require("./data.js");

main().then(()=>{
    console.log("databses connected");
}).catch(err=>{
    console.log("database connection error", err);  
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

async function initialiseDB(){
    await Listing.deleteMany({});
    console.log("existing data deleted");
    const updatedData = initdata.data.map((obj) => ({
        ...obj,
        owner: '69aeef378a7c0e5d5e516d8f',
    }));
    await Listing.insertMany(updatedData);
    console.log("data inserted");
}
initialiseDB();
