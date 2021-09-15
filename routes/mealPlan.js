
//PAGE NOT PROTECTED, WILL CRASH THE PROGRAM IF USER IS NOT LOGGED IN

const express = require('express');
const MealPlan = require('../model/MealPlan')
const MealItem = require('../model/MealItem')
const FoodLog = require('../model/FoodLog')
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Request to view catalog")



    let mealPlans = MealPlan.all(rows =>{

        let Foodlog = FoodLog.findByUser(req.user.userName, foodlog => {

            const foodlogID = foodlog.foodLogID

            let mealPlan = MealPlan.findByFoodlog(foodlogID, row => {
                row.forEach(mealPlan => {

                    MealItem.getAllCaloriesByMealPlan(mealPlan.mealPlanID, row => {
                        const dataUpdate = [row.totalCalories, parseInt(mealPlan.mealPlanID)]
                        console.log(dataUpdate)

                        MealItem.updateMealPlanCalories(dataUpdate);
                    })
                })

            })

            let mealPlanCal = MealPlan.getAllCaloriesFromPlans(foodlogID, sum => {

                if(sum.dailyCalories === null || sum.dailyCalories === undefined)
                    sum.dailyCalories = 0;


                let data1 = [sum.dailyCalories, req.user.userName]

                console.log("Foodlog data " + data1)

                FoodLog.updateCalories(data1);

                res.render('mealPlan', {mealPlan: rows, userFoodLog: foodlogID});
            })
        })
    })
})

router.post('/delete/:id', (req, res) =>{
    const mealPlanID = req.params.id;

    let deleteItem = MealPlan.deleteItemByMealPlan(mealPlanID, (err, row)=>{
        if (err)
            return console.error(err.message)
    })

    let deleteMealPlan = MealPlan.delete(mealPlanID, (err, row) =>{
        if (err)
            console.error(err.message)
        res.redirect('back');
    });
});

module.exports = router;