const dbConnection = require('../db_connection');
const User = require('./user');

class Comment {
    constructor({ Manager, Recipe, Comment, Date, inDB }) {
        this.manager = Manager;
        this.recipe = Recipe;
        this.comment = Comment;
        this.date = Date;
        this.inDB = inDB ? inDB : false;
    }

    static async getAllCommentsOfRecipe(recipe) {
        try {
            let [results] = await dbConnection.makeQuery('SELECT * FROM Comments WHERE RecipeID=?', [ recipe.id ]);
            if (results.length > 0) {
                let comments = [];
                for (let index = 0; index < results.length; index++) {
                    const comment = results[index];
                    let manager = await User.findByEmail(comment.ByManager);
                    comments.push(new Comment({ manager: manager, recipe: recipe, comment: comment.Comment, date: comment.Date, inDB: true}));
                }
                return comments;
            } else {
                return [];
            }
        } catch (error) {
            throw (error);
        }
    }

    async delete() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery('DELETE FROM Comments WHERE ByManager=? AND RecipeID=?', [ this.manager.email, this.recipe.id, ]);
            }
            this.inDB = false;
        } catch (error) {
            throw error;
        }
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