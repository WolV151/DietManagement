const db = require("./db");

class Product {

    static all(callback){
        const sql = "SELECT * FROM product"
        db.all(sql, [], (err, row)=>{
            if (err)
                return err
            //callback(row)
            return callback(row)
        })
    }

    static findById(id, callback){
        const sql = "SELECT * FROM product WHERE productID = ?"

        db.get(sql, id, (err, row) => {
            if (err)
                return console.error(err)
            callback(row);
        })
    }

    static findByCategory(category, callback){
        const sql = "SELECT * FROM product WHERE category = ?"
        db.get(sql, category, (err, row) =>{
            if (err)
                return console.error(err)
            callback(row);
        })
    }
}

module.exports = db;
module.exports = Product;
