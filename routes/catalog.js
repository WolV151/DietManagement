
//PAGE NOT PROTECTED, WILL CRASH THE PROGRAM IF USER IS NOT LOGGED IN

const express = require('express');
const Product = require('../model/Product')
const MealPlan = require('../model/MealPlan')
const MealItem = require('../model/MealItem')
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log("Request to view catalog")
    const id = req.params.id;
    let products = Product.all(rows =>{
        res.render('catalog', {product: rows, mealPlanID: id});
    })
})

router.post('/:mealID/:productID', (req, res) =>{
    const mealPlanID = req.params.mealID;
    const productID = req.params.productID;
    const quantity = req.body.quantity;
    const calories = (req.body.calories) * (quantity);

    const data = {
        quantity: quantity,
        itemCalories: calories,
        mealPlanID: mealPlanID,
        productID: productID
    }


    MealPlan.addItemToPlan(data)
    res.redirect('back')

})

module.exports = router;