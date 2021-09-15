
//PAGE NOT PROTECTED, WILL CRASH THE PROGRAM IF USER IS NOT LOGGED IN

const express = require('express');
const Product = require('../model/Product')
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log("Request to view product details.")
    const id = req.params.id;
    console.log(req.params.id)

    let product = Product.findById(id, row => {
        res.render('productDetails' +
            '', {product: row})
    })

})

module.exports = router;