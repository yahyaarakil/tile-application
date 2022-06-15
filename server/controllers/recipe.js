const Recipe = require('../db/models/recipe');

const fetchAllRecipes = async (approved) => {
    let count = await Recipe.getRecipesCount(approved);
    return await Recipe.getRecipes(0, count, approved);
}

module.exports = {
    fetchAllRecipes: fetchAllRecipes
}