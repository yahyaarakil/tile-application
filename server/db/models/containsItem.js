const dbConnection = require('../db_connection');
const Recipe = require('./recipe');

class ContainsItem {
    constructor({ RecipeID, MaterialCode, Amount, ApplicationType, WaterContent, Density, Viscosity, inDB }) {
        this.recipeId = RecipeID;
        this.materialCode = MaterialCode;
        this.amount = Amount;
        this.applicationType = ApplicationType;
        this.waterContent = WaterContent;
        this.density = Density;
        this.viscosity = Viscosity;
        this.inDB = inDB ? inDB : false;
    }


    static findRecipesContainsMaterialCode(matreialKey) {
        try {
            let [results] = await dbConnection.makeQuery(`
            SELECT r.*
                FROM Recipes r
                JOIN ContainsItems ci ON r.ID = ci.RecipeID
                JOIN Materials m ON ci.MaterialCode = m.Code
            WHERE m.Code =?`, [matreialKey]);

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

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery(
                    'UPDATE ContainsItems SET Amount=?, ApplicationType=?, WaterContent=?, Density=?, Viscosity=?, WHERE RecipeID=? AND MaterialCode=?;',
                    [this.amount, this.applicationType, this.waterContent, this.density, this.viscosity,this.recipeId,this.materialCode]
                );
            } else {
                await dbConnection.makeQuery(
                    'INSERT INTO ContainsPaints (RecipeID, MaterialCode, Amount, ApplicationType, WaterContent, Density, Viscosity) VALUES (?, ?, ?, ?, ?, ?, ?);',
                    [this.recipeId, this.materialCode, this.amount, this.applicationType, this.waterContent, this.density, this.viscosity]
                );
                this.inDB = true;
            }
            return this;
        } catch (err) {
            throw err;
        }
    }
}

