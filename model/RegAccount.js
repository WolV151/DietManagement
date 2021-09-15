const db = require("./db");

class RegAccount{

    static create(data, callback){
        const sql = "INSERT INTO regAccount (userName,password) VALUES (?,?)";
        db.run(sql, data.userName, data.password, callback)
    }

}

module.exports = db;
module.exports = RegAccount;
