if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dbUrl = process.env.ATLASDB_URL;
const secret = process.env.SECRET;
const port = process.env.PORT || 8080;

const listingRoutes = require("./routes/listings");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

if (!dbUrl) {
    throw new Error("ATLASDB_URL is missing. Add it to your environment variables.");
}

if (!secret) {
    throw new Error("SECRET is missing. Add it to your environment variables.");
}

app.set("view engine","ejs"); 
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));

// database connection
main().then(()=>{
    console.log("databses connected");
}).catch(err=>{
    console.log("database connection error", err);  
});
async function main(){
    await mongoose.connect(dbUrl);
}

// session store configuration
const mongoStore = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: secret
    },
    touchAfter: 24 * 60 * 60 // time period in seconds
});

mongoStore.on("error", (err) => {
    console.log("session store error", err);
});

// session configuration
const sessionOptions = {
    store: mongoStore,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionOptions));
app.use(flash());

// passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middleware
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// root route
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

// undefined routes
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

// error middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"} = err;
    res.status(statusCode).send(message);
});

// server start
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
