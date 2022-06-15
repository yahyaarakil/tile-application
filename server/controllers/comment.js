const Recipe = require('../db/models/recipe');
const Comment = require('../db/models/comment');

const fetchCommentsOfRecipe = async (recipeid) => {
    let recipe = await Recipe.findByID(recipeid);
    let comments = await Comment.getAllCommentsOfRecipe(recipe);

    let newComments = [];

    for (var i = 0; i < comments.length; i++) {
        let comment = comments[i];
        newComments.push({ manager: comment.manager.email, comment: comment.comment, date: comment.date });
    }
    return newComments;
}

const addComment = async (comment, user) => {
    let recipe = await Recipe.findByID(comment.recipeId);
    
    let newComment = new Comment({
        Manager: user,
        Recipe: recipe,
        Comment: comment.comment
    });

    return await newComment.save();
}

module.exports = {
    addComment: addComment,
    fetchCommentsOfRecipe, fetchCommentsOfRecipe
}