const dbConnection = require('../db_connection');
const User = require('./user');
const ContainsMaterial = require('./containsMaterial');
const ContainsPaint = require('./containsPaint');

class Recipe {
    constructor ({
        ID, Name, Size, CreationDate, inDB, CreatedBy, PreviousVersion,
        MoldShape, BakerName, InitTemp, Humidity, DryingDuration, DryingTemp,
        BakingDuration, BakingTemp, Approved, Approval, Unapproval,
        Materials, Paints,
    }) {
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
        this.rejectionDate = Unapproval ? Unapproval.RejectionDate : null;

        this.materials = Materials ? Materials : [];
        this.paints = Paints ? Paints : [];

        this.inDB = inDB ? inDB : false;
    }

    static async constructRecipe(recipe) {
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
        // populate materials and paints
        recipe.paints = ContainsPaint.findMaterialsByRecipe(recipe);        
        recipe.materials = ContainsMaterial.findMaterialsByRecipe(recipe);        
        return new Recipe(recipe);
    }

    static async findByID(value) {
        try {
            let [results] = await dbConnection.makeQuery(`SELECT * FROM Recipes WHERE ID=?;`, [ value ]);
            if (results.length > 0) {
                let recipe = results[0];
                recipe.inDB = true;
                return await Recipe.constructRecipe(recipe);
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    static async constructRecipes(results) {
        if (results.length > 0) {
            let recipes = [];
            for (let index = 0; index < results.length; index++) {
                const recipe = results[index];
                recipe.inDB = true;
                recipes.push(await Recipe.constructRecipe(recipe));
            }
            return recipes;
        }
        else {
            return [];
        }
    }

    static async getRecipesCount(approved = false) {
        try {
            let [results] = await dbConnection.makeQuery('SELECT COUNT(ID) AS noRecipes FROM Recipes WHERE Approved=?', [ approved ]);
            return results[0].noRecipes;
        } catch (error) {
            throw error;
        }
    }

    static async getRecipes(from, to, approved = false) {
        try {
            let count = to - from + 1;
            let [results] = await dbConnection.makeQuery('SELECT * FROM Recipes WHERE Approved=? ORDER BY CreationDate LIMIT ?, ?', [ approved, from, count ]);
            return await Recipe.constructRecipes(results);
        } catch (error) {
            throw error;
        }
    }

    static async findRecipesContainsMaterialCode(matreialKey, from, to) {
        try {
            let count = to - from + 1;
            let [results] = await dbConnection.makeQuery(`
            (SELECT r.*
                FROM Recipes r
                JOIN ContainsMaterials ci ON r.ID = ci.RecipeID
                JOIN Materials m ON ci.MaterialCode = m.Code
                WHERE m.Code = ?)
                UNION ALL
                (SELECT r.*
                FROM Recipes r
                JOIN ContainsPaints cp ON r.ID = cp.RecipeID
                JOIN Materials m ON cp.MaterialCode = m.Code
                WHERE m.Code = ?)
                ORDER BY CreationDate
                LIMIT ?, ?`, [ matreialKey, matreialKey, from, count ]);
            return await Recipe.constructRecipes(results);
        } catch (error) {
            throw error;
        }
    }

    static async findRecipesByName(from, to, name = "") {
        try {
            let count = to - from + 1;
            let [results] = await dbConnection.makeQuery('SELECT * FROM Recipes WHERE Name LIKE ? ORDER BY CreationDate LIMIT ?, ?', [ `%${name}%`, from, count ]);
            return await Recipe.constructRecipes(results);
        } catch (error) {
            throw error;
        }
    }

    static async findRecipesCommentedBy(manager, from, to){
        try {
            let count = to - from + 1;
            let [results] = await dbConnection.makeQuery(
                'SELECT r.*, c.Comment FROM comments c JOIN recipes r on r.ID = c.RecipeID where c.ByManager=? ORDER BY CreationDate LIMIT ?, ?',
                [manager.email, from, count ]
                );
            return await results;//Recipe.constructRecipes(results);
        } catch (error) {
            throw error;
        }
    }

    addMaterial(material, { amount, applicationType, waterContent, density, viscosity }) {
        this.materials.push(new ContainsMaterial({
            RecipeID: this.id,
            MaterialCode: material.code,
            Amount: amount,
            ApplicationType: applicationType,
            WaterContent: waterContent, 
            Density: density,
            Viscosity: viscosity
        }));
    }

    addPaint(material, { grammage }) {
        this.paints.push(new ContainsPaint({
            RecipeID: this.id,
            MaterialCode: material.code,
            Grammage: grammage
        }));
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery(
                    'UPDATE Recipes SET Name=?, Size=? , CreatedBy=? , PreviousVersion=? , MoldShape=? , BakerName=? , InitTemp=? , Humidity=? , DryingDuration=? , DryingTemp=? , BakingDuration=? , BakingTemp=?, Approved=? WHERE ID=?;',
                    [ this.name, this.size, this.createdBy.email, this.previousVersion?this.previousVersion.id:null, this.moldShape, this.bakerName, this.initTemp, this.humidity, this.dryingDuration, this.dryingTemp, this.bakingDuration, this.bakingTemp, this.approved, this.id ]
                );
            } else {
                let [res] = await dbConnection.makeQuery(
                    'INSERT INTO Recipes (Name, Size, CreatedBy, PreviousVersion, MoldShape, BakerName, InitTemp, Humidity, DryingDuration, DryingTemp, BakingDuration , BakingTemp, Approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                    [ this.name, this.size, this.createdBy.email, this.previousVersion?this.previousVersion.id:null, this.moldShape, this.bakerName, this.initTemp, this.humidity, this.dryingDuration, this.dryingTemp, this.bakingDuration, this.bakingTemp, this.approved ]
                );
                this.id = res.insertId;
                this.inDB = true;
            }

            if (this.approved) {
            }

            if (this.approved) {
                // if approved remove all comments
                await dbConnection.makeQuery('DELETE FROM Comments WHERE RecipeID=?;', [ this.id ]);

                await dbConnection.makeQuery('DELETE FROM ApprovedRecipes WHERE ID=?;', [ this.id ]);
                await dbConnection.makeQuery('DELETE FROM UnapprovedRecipes WHERE ID=?;', [ this.id ]);

                await dbConnection.makeQuery('INSERT INTO ApprovedRecipes (ID) VALUES (?);', [ this.id ]);
            } else {
                await dbConnection.makeQuery('DELETE FROM ApprovedRecipes WHERE ID=?;', [ this.id ]);
                try {
                    await dbConnection.makeQuery('INSERT INTO UnapprovedRecipes (ID, CorrectionRequested, IsRejected, RejectionDate) VALUES (?, ?, ?, ?);', [ this.id, this.correctionRequested, this.isRejected, this.rejectionDate ]);
                } catch (error) {
                    if (error.errno === 1062) {
                        await dbConnection.makeQuery('UPDATE UnapprovedRecipes SET CorrectionRequested=?, IsRejected=?, RejectionDate=?;', [this.correctionRequested, this.isRejected, this.rejectionDate ]);
                    } else {
                        throw error;
                    }
                }
            }

            for (let index = 0; index < this.materials.length; index++) {
                const material = this.materials[index];
                material.save();
            }

            for (let index = 0; index < this.paints.length; index++) {
                const paint = this.paints[index];
                paint.save();
            }

            return this;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Recipe;