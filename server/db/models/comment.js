const dbConnection = require('../db_connection');

class Comment {
    constructor({ Manager, Recipe, Comment, Date, inDB }) {
        this.manager = Manager;
        this.recipe = Recipe;
        this.comment = Comment;
        this.date = Date;
        this.inDB = inDB ? inDB : false;
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery('UPDATE Comments SET Comment=? WHERE ByManager=? AND RecipeId=? ;',
                    [this.comment, this.manager.email, this.recipe.id]);
            } else {
                await dbConnection.makeQuery(
                    'INSERT INTO Comments (Comment, ByManager, RecipeID) VALUES (?, ?, ?);',
                    [this.comment, this.manager.email, this.recipe.id]
                );
                this.inDB = true;
            }

        } catch (error) {
            throw error;
        }
    }

}
module.exports = Comment;