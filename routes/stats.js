
//PAGE NOT PROTECTED, WILL CRASH THE PROGRAM IF USER IS NOT LOGGED IN

const express = require('express');
const router = express.Router();
const User = require('../model/User');
const loginRouter = require('../routes/login'); // i need to know what is the current user

router.use(express.json());
router.use(express.urlencoded({ extended: false }));



router.get("/", async (req, res) => {
        let stats = User.getUserStats(req.user.userName, row =>{
                console.log(row);
                res.render("stats", {stats: row});
        })

});

module.exports = router;