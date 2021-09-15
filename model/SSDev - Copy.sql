CREATE TABLE IF NOT EXISTS "user" (

        [userID] INTEGER PRIMARY KEY ,
    [userName] TEXT,
    [name] TEXT,
        [email] TEXT,
    [age] INTEGER,
    [gender] TEXT,
    [address] TEXT,
    [height] INTEGER,
    [weight] INTEGER,
    [phone] TEXT,

        FOREIGN KEY ([userName]) REFERENCES "regAccount" ([userName])
                ON DELETE NO ACTION ON UPDATE NO ACTION
    );
CREATE TABLE IF NOT EXISTS "regAccount" (

    [userName] TEXT PRIMARY KEY,
    [password] TEXT

    );
CREATE TABLE IF NOT EXISTS "foodLog" (

        [foodLogID] INTEGER PRIMARY KEY ,
    [totalCalories] REAL,
        [userName] TEXT,

    FOREIGN KEY ([userName]) REFERENCES "regAccount" ([userName])
                ON DELETE NO ACTION ON UPDATE NO ACTION
    );
CREATE TABLE IF NOT EXISTS "mealPlan" (

        [mealPlanID] INTEGER PRIMARY KEY ,
    [type] TEXT,
    [totalCalories] INTEGER,
    [foodLogID] INTEGER,

    FOREIGN KEY ([foodLogID]) REFERENCES "foodLog" ([foodLogID])
                ON DELETE NO ACTION ON UPDATE NO ACTION
    );
CREATE TABLE IF NOT EXISTS "product" (

        [productID] INTEGER PRIMARY KEY ,
    [image] TEXT,
    [name] TEXT,
    [category] INTEGER,
    [calories] INTEGER
    );
CREATE TABLE IF NOT EXISTS "mealItem" (

        [itemID] INTEGER PRIMARY KEY ,
    [quantity] INTEGER,
    [itemCalories] INTEGER,
    [mealPlanID] INTEGER,
    [productID] INTEGER,
    FOREIGN KEY ([mealPlanID]) REFERENCES "mealPlan" ([mealPlanID]),
        FOREIGN KEY ([productID]) REFERENCES "product" ([productID])
                ON DELETE NO ACTION ON UPDATE NO ACTION
    );
    
INSERT INTO "product" VALUES(1, "http://localhost:3000/images/apple.png", "apple", "fresh fruit", 115);
INSERT INTO "product" VALUES(2, "http://localhost:3000/images/strawberry.png", "strawberry", "fresh fruit", 106);
INSERT INTO "product" VALUES(3, "http://localhost:3000/images/leek.png", "leek", "vegetable", 38);
INSERT INTO "product" VALUES(4, "http://localhost:3000/images/cabbage.png", "cabbage", "vegetable", 875);
INSERT INTO "product" VALUES(7, "http://localhost:3000/images/bacon.png", "bacon", "meat", 106);
INSERT INTO "product" VALUES(8, "http://localhost:3000/images/kfc_food.png", "chicken", "meat", 110);
INSERT INTO "product" VALUES(10, "http://localhost:3000/images/lobster.png", "lobster", "seafood", 233);
INSERT INTO "product" VALUES(11, "http://localhost:3000/images/donald_duck.png", "duck meat", "poultry", 150);
INSERT INTO "product" VALUES(12, "http://localhost:3000/images/turkey.png", "turkey", "poultry", 211);
INSERT INTO "product" VALUES(13, "http://localhost:3000/images/pancake.png", "pancake", "dessert", 174);
INSERT INTO "product" VALUES(14, "http://localhost:3000/images/chocolate_cake.png", "cake", "dessert", 261);
INSERT INTO "product" VALUES(15, "http://localhost:3000/images/baklava.jpg", "baklava", "pastry", 334);
INSERT INTO "product" VALUES(17, "http://localhost:3000/images/spaghetti.png", "spaghetti", "pasta", 220);
INSERT INTO "product" VALUES(18, "http://localhost:3000/images/pizza.png", "pizza margherita", "pizza", 254);
INSERT INTO "product" VALUES(19, "http://localhost:3000/images/pizza2.png", "calzone", "pizza", 841);