const dbConnection = require('../db_connection');

class ContainsPaint {
    constructor({ RecipeID, MaterialCode, Grammage, inDB }) {
        this.recipeId = RecipeID;
        this.materialCode = MaterialCode;
        this.grammage = Grammage;
        this.inDB = inDB ? inDB : false;
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery(
                    'UPDATE ContainsPaints SET RecipeID=?, MaterialCode=?, Grammage=?, WHERE RecipeID=? AND MaterialCode=?;',
                    [this.recipeId, this.materialCode, this.grammage, this.recipeId, this.materialCode]
                );
            } else {
                await dbConnection.makeQuery(
                    'INSERT INTO ContainsPaints (RecipeID, MaterialCode, Grammage) VALUES (?, ?, ?);',
                    [this.recipeId, this.materialCode, this.grammage]
                );
                this.inDB = true;
            }
            return this;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ContainsPaint;