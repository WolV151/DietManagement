const db = require("./db");

class MealPlan{

    static findByType(type, callback){
        const sql = "SELECT * FROM mealPlan WHERE type = ?"
        db.get(sql, type, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        })
    }

    static findByID(id, callback){
        const sql = "SELECT * FROM mealPlan WHERE mealPlanID = ?"
        db.get(sql, id, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        })
    }

    static findByFoodlog(foodLogID, callback){
        const sql = "SELECT * FROM mealPlan WHERE foodLogID = ?"
        db.all(sql, [foodLogID], (err, row)=>{
            if (err)
                return console.error(err)
            //callback(row)
            return callback(row)
        })
    }

    static all(callback){
        const sql = "SELECT * FROM mealPlan"
        db.all(sql, [], (err, row)=>{
            if (err)
                return err
            //callback(row)
            return callback(row)
        })
    }

    static create(data, callback){
        const sql = "INSERT INTO mealPlan (type,totalCalories,foodLogID) VALUES (?,?,?)";
        db.run(sql, data.type, data.totalCalories, data.foodLogID, callback)
    }

    static addItemToPlan(data, callback){
        const sql = "INSERT INTO mealItem (quantity,itemCalories,mealPlanID, productID) VALUES (?,?,?,?)";
        db.run(sql, data.quantity, data.itemCalories, data.mealPlanID, data.productID, callback);
    }

    static getAllCaloriesFromPlans(foodLogID, callback){
        const sql = "SELECT SUM(totalCalories) AS dailyCalories " +
            "FROM mealPlan " +
            "WHERE foodLogID = ?"
        db.get(sql, foodLogID, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        });

    }

    static deleteItemByMealPlan(id, callback){
        const sqlItem = "DELETE FROM mealItem WHERE mealPlanID = ?"
        db.run(sqlItem, id, callback)
    }

    static delete(id, callback){
        const sql = "DELETE FROM mealPlan WHERE mealPlanID = ?"
        db.run(sql, id, callback);
    }

}

module.exports = MealPlan;