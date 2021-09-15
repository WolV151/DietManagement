const db = require("./db");

class FoodLog {
    static create(data, callback){
        const sql = "INSERT INTO foodLog (totalCalories, userName) VALUES (?,?)";
        db.run(sql, data.totalCalories, data.userName, callback)
    }

    static findByID(id, callback){
        const sql = "SELECT * FROM foodLog WHERE foodLogID = ?"
        db.get(sql, id, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        })
    }

    static findByUser(username, callback){
        const sql = "SELECT * FROM foodLog WHERE userName = ?"
        db.get(sql, username, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        })
    }

    static updateCalories(data, callback){
        const sql = "UPDATE foodLog " +
            "SET totalCalories = ? " +
            "WHERE userName = ?"
        db.run(sql, data, err => {
            if (err)
                return console.log(err)
            console.log(`Rows updated.`)
        }, callback)
    }

}

module.exports = FoodLog;