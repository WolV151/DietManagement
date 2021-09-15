var express = require('express');
var router = express.Router();
const app = require('../app');

/* GET home page. */
const checkAuthenticated = (req, res, next) => { // works but gives errors, decided only to use it on index
  if(req.isAuthenticated()){
    next();
  }
  res.redirect('/login');
}


router.get('/', checkAuthenticated, (req, res, next) => {
  console.log(req.user.userName);
  res.render('index');
})

module.exports = router;
