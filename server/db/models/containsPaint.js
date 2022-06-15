const dbConnection = require('../db_connection');

class ContainsPaint {
    constructor({ RecipeID, MaterialCode, Grammage, inDB }) {
        this.recipeId = RecipeID;
        this.materialCode = MaterialCode;
        this.grammage = Grammage;
        this.inDB = inDB ? inDB : false;
    }

    static async findMaterialsByRecipeID(recipe) {
        try {
            let [results] = await dbConnection.makeQuery('SELECT * FROM ContainsPaints WHERE RecipeID=?', [ recipe ]);
            if (results.length > 0) {
                let containsPaints = []
                for (let index = 0; index < results.length; index++) {
                    const containsPaint = results[index];
                    containsPaint.inDB = true;
                    containsPaints.push(new ContainsPaint(containsPaint));
                }
                return containsPaints;
            } else {
                return [];
            }
        } catch (err) {
            throw err;
        }
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery(
                    'UPDATE ContainsPaints SET RecipeID=?, MaterialCode=?, Grammage=? WHERE RecipeID=? AND MaterialCode=?;',
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