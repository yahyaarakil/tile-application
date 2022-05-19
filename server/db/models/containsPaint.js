const dbConnection = require('../db_connection');
const Recipe = require('./recipe');

class ContainsPaint{
    constructor({RecipeID, MaterialCode, Grammage, inDB}){
        this.recipeId = RecipeID;
        this.materialCode = MaterialCode;
        this.grammage = Grammage;
        this.inDB = inDB ? inDB : false;
    }

    static findRecipesContainsMaterialCode(matreialKey){
        try {
            let [results] = await dbConnection.makeQuery(`
            SELECT r.*
                FROM Recipes r
                JOIN ContainsPaint cp ON r.ID = cp.RecipeID
                JOIN Materials m ON cp.MaterialCode = m.Code
            WHERE m.Code =?`,[matreialKey]);

            if (results.length > 0) {
                let recipe = results[0];
                recipe.inDB = true;
                return new Recipe(recipe);
            }
            else {
                return null;
            }

        } catch (error) {
            throw error;
        }
    }
}

    