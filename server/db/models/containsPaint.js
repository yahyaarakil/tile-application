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
                JOIN ContainsPaints cp ON r.ID = cp.RecipeID
                JOIN Materials m ON cp.MaterialCode = m.Code
            WHERE m.Code =?`,[matreialKey]);

            if (results.length > 0) {
                let recipes = [];
                for (let index = 0; index < results.length; index++) {
                    const recipe = results[index];
                    recipe.inDB = true;
                    recipes.push(new Recipe(recipe));
                }
                return recipes;
            }
            else {
                return [];
            }

        } catch (error) {
            throw error;
        }
    }
}

    