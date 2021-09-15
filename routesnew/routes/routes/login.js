const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    console.log("Request for login received.")
    res.render("../views/login")
})

router.post("/", (req, res) => {
    console.log("Post for login received.");
    res.render('index', { title: req.body.username });
})

module.exports = router;
