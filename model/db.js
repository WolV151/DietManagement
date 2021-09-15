var path = require('path');
const sqlite3 = require('sqlite3').verbose();

// open the database connection
//__dirname is always the directory in which the currently executing script resides
let DB_PATH = path.join(__dirname, "project.db");
let db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        console.error(err.message);
    console.log('Connected to ' + DB_PATH + ' database.')

    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON;', (error) => {
        if (error)
            console.error("Pragma statement didn't work.");
        else
            console.log("Foreign Key Enforcement is on.");
    });
});

//list all tables in the database
db.serialize(function () {
    db.all("select name from sqlite_master where type='table'", (err, table) => {
        console.log(table);
    });
    db.all('select * from product', (err, products) =>
    {  console.log(products);

    });
});

module.exports = db;
