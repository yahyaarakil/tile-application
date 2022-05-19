const dbConnection = require('../db_connection');
const User = require('./user');

class Recipe {
    constructor ({
        ID, Name, Size, CreationDate, inDB, CreatedBy, PreviousVersion, MoldShape, BakerName, InitTemp, Humidity, DryingDuration, DryingTemp, BakingDuration, BakingTemp, Approved, Approval, Unapproval}) {
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
        this.approved = Approved ? Approved : false;

        this.approvalDate = Approval ? Approval.ApprovalDate : null;
        this.correctionRequested = Unapproval ? Unapproval.CorrectionRequested : null;
        this.isRejected = Unapproval ? Unapproval.IsRejected : false;

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
                // populate approval
                if (recipe.Approved) {
                    recipe.Approval = await dbConnection.makeQuery('SELECT * FROM ApprovedRecipes WHERE ID=?', [ recipe.ID ])[0];
                } else {
                    recipe.Unapproval = await dbConnection.makeQuery('SELECT * FROM UnapprovedRecipes WHERE ID=?', [ recipe.ID ])[0];
                }
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
                console.log("HERE")
                console.log(this)
                await dbConnection.makeQuery(
                    'UPDATE Recipes SET Name=?, Size=? , CreatedBy=? , PreviousVersion=? , MoldShape=? , BakerName=? , InitTemp=? , Humidity=? , DryingDuration=? , DryingTemp=? , BakingDuration=? , BakingTemp=? WHERE ID=?;',
                    [ this.name, this.size, this.createdBy.email, this.previousVersion?this.previousVersion.id:null, this.moldShape, this.bakerName, this.initTemp, this.humidity, this.dryingDuration, this.dryingTemp, this.bakingDuration, this.bakingTemp, this.id ]
                );
                await dbConnection.makeQuery('DELETE FROM ApprovedRecipes WHERE ID=?;', [ this.id ]);
                await dbConnection.makeQuery('DELETE FROM UnapprovedRecipes WHERE ID=?;', [ this.id ]);
            } else {
                let [res] = await dbConnection.makeQuery(
                    'INSERT INTO Recipes (Name, Size, CreatedBy, PreviousVersion, MoldShape, BakerName, InitTemp, Humidity, DryingDuration, DryingTemp, BakingDuration , BakingTemp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                    [ this.name, this.size, this.createdBy.email, this.previousVersion?this.previousVersion.id:null, this.moldShape, this.bakerName, this.initTemp, this.humidity, this.dryingDuration, this.dryingTemp, this.bakingDuration, this.bakingTemp ]
                );
                this.id = res.insertId;
                this.inDB = true;
            }
            if (this.approved) {
                await dbConnection.makeQuery('INSERT INTO ApprovedRecipes (ID) VALUES (?);', [ this.id ]);
            } else {
                await dbConnection.makeQuery('INSERT INTO UnapprovedRecipes (ID, CorrectionRequested, IsRejected) VALUES (?, ?, ?);', [ this.id, this.correctionRequested, this.isRejected ]);
            }
            return this;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Recipe;