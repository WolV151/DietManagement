const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Login = require('../model/Login');
const bcrypt = require('bcrypt');
const flash = require('express-flash')
const passport = require('passport');
const session = require('express-session')


const initializePassport = require('../model/passport-config');

initializePassport(passport);

const checkIsLoggedIn = (req, res, next) => { // works but gives errors, decided only to use it on index
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    next();
}


router.use(flash());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", checkIsLoggedIn,(req, res) => {
    console.log("Request for login received.")
    res.render("../views/login")
})

router.post("/",  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;

