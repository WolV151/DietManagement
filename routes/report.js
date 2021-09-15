
//PAGE NOT PROTECTED, WILL CRASH THE PROGRAM IF USER IS NOT LOGGED IN

const express = require('express');
const MealPlan = require('../model/MealPlan')
const FoodLog = require('../model/FoodLog')
const User = require('../model/User')
const router = express.Router();

router.get('/', (req, res) => {

    let Foodlog = FoodLog.findByUser(req.user.userName, foodlog => {

        const foodlogID = foodlog.foodLogID

        let mealPlanCal = MealPlan.getAllCaloriesFromPlans(foodlogID, sum => {

            if (sum.dailyCalories === null || sum.dailyCalories === undefined)
                sum.dailyCalories = 0;


            let data1 = [sum.dailyCalories, req.user.userName]

            console.log("Foodlog data " + data1)

            FoodLog.updateCalories(data1);

            let defineBMRByGender = User.getUserStats(req.user.userName, row =>{
                let BMR = 0;
                let warningMessage = "";
                if (row.gender === 'M')
                    BMR = 66 + (6.3 * (parseInt(row.weight) * 0.453592)) + (12.9 * (parseInt(row.height) / 2.54)) - (6.8 * parseInt(row.age))
                else
                    BMR = 665 + (4.3 * parseInt(row.weight) * 0.453592 + (4.7 * parseInt(row.height) - 4.7 * parseInt(row.age)))

                if (sum.dailyCalories < BMR)
                    warningMessage = "Your daily intake of calories is lower than your BMR."
                else if (sum.dailyCalories > BMR)
                    warningMessage = "Your daily intake of calories is higher than your BMR."
                else
                    warningMessage = "Your daily intake of calories is the same as than your BMR."



                res.render('report', {foodLog: foodlog, bmr: BMR.toFixed(3), message:warningMessage})
            })

        })
    })
})

module.exports = router