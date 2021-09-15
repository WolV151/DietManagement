const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require("../model/User");
const {RegAccount} = require("../model/RegAccount");
const db = require("../model/project.db")

router.get("/", (req, res) => {
    console.log("Request for login received.");
    res.render("../views/register");
})

router.post("/", async (req, res) => {
    console.log("Post for login received.")
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            userName: req.body.username,
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            height: req.body.height,
            weight: req.body.weight,
            contactNumber: req.body.contactNumber
        }

        const regAccount = {
            password: hashPassword,
            userName: req.body.userName
        }

        User.create(user);
        RegAccount.create(regAccount);

    }catch {
        console.log("Error registering the user")
        res.redirect('/register')
    }



})

module.exports = router;