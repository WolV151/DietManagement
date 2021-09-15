
//PAGE NOT PROTECTED, WILL CAUSE PROBLEMS IF USER NOT LOGGED IN

const express = require('express');
const MealPlan = require('../model/MealPlan')
const MealItem = require('../model/MealItem')
const FoodLog = require('../model/FoodLog')
const router = express.Router();

router.get('/:id', async (req, res) => {
    console.log("Request to view product details.")
    const id = req.params.id;
    console.log(req.params.id);

    let mealPlan = await MealPlan.findByID(id, row => {
            // MealItem.getAllCaloriesByMealPlan(id, row =>{
            // const dataUpdate = [row.totalCalories, parseInt(id)]
            // console.log(dataUpdate)
            //
            // MealItem.updateMealPlanCalories(dataUpdate);
            // })

            let mealProducts = MealItem.displayMealItemsByID(id,products => {

            res.render('mealPlanEdit' +
                '', {meal: row, products: products})
        })
    })
})

router.post('/delete/:id', (req, res) =>{
    const itemID = req.params.id;

    let deleteProd = MealItem.delete(itemID, (err, row) =>{
        if (err)
            console.error(err.message)
        res.redirect('back');
    });
});

module.exports = router;