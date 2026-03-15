const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usersControllers = require("../controllers/users");

router.get("/signup", usersControllers.signupform);

router.post("/signup", wrapAsync(usersControllers.signup));

router.get("/login", usersControllers.loginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), usersControllers.login);

router.get("/logout", usersControllers.logout);

module.exports = router;
