const dbConnection = require('../db_connection');
class ContainsMaterial {
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

    static async findMaterialsByRecipeID(recipe) {
        try {
            let [results] = await dbConnection.makeQuery('SELECT * FROM ContainsMaterials WHERE RecipeID=?', [ recipe ]);
            if (results.length > 0) {
                let containsMaterials = []
                for (let index = 0; index < results.length; index++) {
                    const containsMaterial = results[index];
                    containsMaterial.inDB = true;
                    containsMaterials.push(new ContainsMaterial(containsMaterial));
                }
                return containsMaterials;
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
                    'UPDATE ContainsMaterials SET Amount=?, ApplicationType=?, WaterContent=?, Density=?, Viscosity=?, WHERE RecipeID=? AND MaterialCode=?;',
                    [this.amount, this.applicationType, this.waterContent, this.density, this.viscosity,this.recipeId,this.materialCode]
                );
            } else {
                await dbConnection.makeQuery(
                    'INSERT INTO ContainsMaterials (RecipeID, MaterialCode, Amount, ApplicationType, WaterContent, Density, Viscosity) VALUES (?, ?, ?, ?, ?, ?, ?);',
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

module.exports = ContainsMaterial