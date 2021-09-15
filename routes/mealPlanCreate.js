
//PAGE NOT PROTECTED, WILL CRASH THE PROGRAM IF USER IS NOT LOGGED IN

const express = require('express');
const MealPlan = require('../model/MealPlan')
const FoodLog = require('../model/FoodLog')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('mealPlanCreate');
})

router.post('/', (req, res) =>{
    FoodLog.findByUser(req.user.userName, foodLog =>{

        const mealPlanInfo = {
            type: req.body.mealPlanType,
            totalCalories: 0,
            foodLogID: foodLog.foodLogID
        }

        MealPlan.create(mealPlanInfo);
    })
    res.redirect('/mealPlan');
} )

module.exports = router;