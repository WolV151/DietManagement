const db = require("./db");

class MealItem {
    static displayMealItemsByID(mealPlanId, callback) {
        const sql = "SELECT mp.itemID, mp.mealPlanID, mp.itemCalories, mp.quantity, p.name, p.category " +
            "FROM mealItem mp, product p " +
            "WHERE mp.productID = p.productID " +
            "AND mp.mealPlanID = ?"
        db.all(sql, [mealPlanId], (err, row)=>{
            if (err)
                return console.error(err)
            //callback(row)
            return callback(row)
        })
    }

    static all(callback){
        const sql = "SELECT * FROM mealItem"
        db.all(sql, [], (err, row)=>{
            if (err)
                return err
            //callback(row)
            return callback(row)
        });
    }

    static getAllCaloriesByMealPlan(mealPlanID, callback){
        const sql = "SELECT SUM(itemCalories) AS totalCalories " +
            "FROM mealItem " +
            "WHERE mealPlanID = ?"
        db.get(sql, mealPlanID, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        });
    }

    static updateMealPlanCalories(data, callback){
        const sql = "UPDATE mealPlan " +
            "SET totalCalories = ? " +
            "WHERE mealPlanID = ?"
        db.run(sql, data, err => {
            if (err)
                return console.log(err)
            console.log(`Rows updated.`)
        }, callback)
    }

    static delete(id, callback){
        const sql = "DELETE FROM mealItem WHERE itemID = ?"
        db.run(sql, id, callback);
    }

}

module.exports = MealItem;

