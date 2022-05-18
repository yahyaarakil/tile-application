const dbConnection = require('../db_connection');
const User = require('./user');

class Recipe {
    constructor ({
        ID, Name, Size, CreationDate, inDB, CreatedBy, PreviousVersion, MoldShape, BakerName, InitTemp, Humidity, DryingDuration, DryingTemp, BakingDuration, BakingTemp}) {
        this.id = ID;
        this.name = Name;
        this.size = Size;
        this.creationDate = CreationDate ? CreationDate : null;

        this.createdBy = CreatedBy;
        this.previousVersion = PreviousVersion ? PreviousVersion : null;

        this.moldShape = MoldShape;
        this.bakerName = BakerName;
        this.initTemp = InitTemp;
        this.humidity = Humidity;
        this.dryingDuration = DryingDuration;
        this.dryingTemp = DryingTemp;
        this.bakingDuration = BakingDuration;
        this.bakingTemp = BakingTemp;

        this.inDB = inDB ? inDB : false;
    }

    static async findByID(value) {
        try {
            let [results] = await dbConnection.makeQuery(`SELECT * FROM Recipes WHERE ID=?;`, [ value ]);
            if (results.length > 0) {
                let recipe = results[0];
                recipe.inDB = true;
                // populate previous version
                if (recipe.PreviousVersion !== null) {
                    recipe.PreviousVersion = await Recipe.findByID(recipe.PreviousVersion);
                }
                // populate createdBy
                recipe.CreatedBy = await User.findByEmail(recipe.CreatedBy);
                return new Recipe(recipe);
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery(
                    'UPDATE Recipes SET Name=?, Size=? , CreatedBy=? , PreviousVersion=? , MoldShape=? , BakerName=? , InitTemp=? , Humidity=? , DryingDuration=? , DryingTemp=? , BakingDuration=? , BakingTemp=? WHERE ID=?;',
                    [ this.name, this.size, this.createdBy.email, this.previousVersion.id, this.moldShape, this.bakerName, this.initTemp, this.humidity, this.dryingDuration, this.dryingTemp, this.bakingDuration, this.bakingTemp, this.id ]
                );
            } else {
                let [res] = await dbConnection.makeQuery(
                    'INSERT INTO Recipes (Name, Size, CreatedBy, PreviousVersion, MoldShape, BakerName, InitTemp, Humidity, DryingDuration, DryingTemp, BakingDuration , BakingTemp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                    [ this.name, this.size, this.createdBy.email, this.previousVersion?this.previousVersion.id:null, this.moldShape, this.bakerName, this.initTemp, this.humidity, this.dryingDuration, this.dryingTemp, this.bakingDuration, this.bakingTemp ]
                );
                this.inDB = true;
                this.id = res.insertId;
            }
            return this;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Recipe;