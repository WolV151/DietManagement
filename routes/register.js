var express = require('express');
const bcrypt = require('bcrypt')
var router = express.Router();
const User = require('../model/User');
const RegAcc = require('../model/RegAccount');
const FoodLog = require('../model/FoodLog')
router.use(express.urlencoded({ extended: false }));

const checkIsLoggedIn = (req, res, next) => { // works but gives errors, decided only to use it on index
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    next();
}

router.get("/", checkIsLoggedIn
    ,(req, res) => {
    console.log("Request to view register received.");
    res.render("../views/register");
})

router.post("/", async (req, res) => {
    console.log("Post for register received.");

    try {
        const hashedPw = await bcrypt.hash(req.body.password, 10);

        const regAccount = {
            userName: req.body.username,
            password: hashedPw,
        };

        const userAccount = {
            userName: req.body.username,
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address,
            height: req.body.height,
            weight: req.body.weight,
            phone: req.body.phone,
        };

        const foodLog = {
            totalCalories: 0,
            userName: req.body.username,
        }

        RegAcc.create(regAccount);
        FoodLog.create(foodLog);
        User.create(userAccount);


        res.redirect('/login');
        console.log("Acc create received");

    }catch{
        res.redirect('/register');
        console.log("Error creating the user");
    }

})

module.exports = router;