
//PAGE NOT PROTECTED, WILL CRASH THE PROGRAM IF USER IS NOT LOGGED IN

const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get("/", (req, res) => {
    let stats = User.getUserStats(req.user.userName, row =>{
        console.log(row);
        res.render("edit", {stats: row});
    })
})

router.post("/", (req, res) => {
    let data = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.body.address,
        req.body.height,
        req.body.weight,
        req.body.phone,
        req.user.userName
    ]
    User.update(data)
    res.redirect('/stats')
})

module.exports = router;