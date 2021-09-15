const db = require("./db");

class User{

    static create(data, callback){
        const sql = "INSERT INTO user (userName, name, email, age, gender, address, height, weight, phone) " +
            "VALUES (?,?,?,?,?,?,?,?,?)";
        db.run(sql, data.userName, data.name, data.email, data.age, data.gender, data.address, data.height, data.weight
        , data.phone, callback)
    }

    static find(username, callback){
        db.get("SELECT * FROM regAccount WHERE userName = ?", username, (err, row) =>{
            if (err)
                return console.error(err);
            callback(row);
        })
    }

    static getUserStats(username, callback){
        const sql = "Select * FROM user WHERE userName = ?";
        db.get(sql, username, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        })
    }

    static allStats(callback){
        const sql = "SELECT * FROM user"
        db.all(sql, [], (err, row)=>{
            if (err)
                return err
            //callback(row)
            return callback(row)
        })
    }

    static all(callback){
        const sql = "SELECT * FROM regAccount"
        db.all(sql, [], (err, row)=>{
            if (err)
                return console.error(err)
            //callback(row)
            return callback(row)
        })
    }

    static update(data, callback){
        const sql = "UPDATE user SET name = ?, email = ?, age = ?, gender = ?, address = ?, height = ?, weight = ?, phone = ? " +
            "WHERE userName = ?"
        db.run(sql, data, err => {
            if (err)
                return console.log(err)
            console.log(`Rows updated.`)
        }, callback)
    }

}

module.exports = db;
module.exports = User;