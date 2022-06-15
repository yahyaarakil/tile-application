const Recipe = require('../db/models/recipe');
const Material = require('../db/models/material');

const fetchAllRecipes = async (approved) => {
    let count = await Recipe.getRecipesCount(approved);
    return await Recipe.getRecipes(0, count, approved);
}

const addRecipe = async (recipe, user) => {
    let newRecipe = new Recipe(recipe);
    newRecipe.createdBy = user;
    newRecipe.materials = [];
    newRecipe.paints = [];
    await newRecipe.save();
    
    for (var i = 0; i < recipe.Materials.length; i++) {
        let materialCode = recipe.Materials[i].code;
        let info = recipe.Materials[i].info;
        let material = await Material.findByCode(materialCode);
        newRecipe.addMaterial(material, info);
    }
    for (var i = 0; i < recipe.Paints.length; i++) {
        let paintCode = recipe.Paints[i].code;
        let info = recipe.Paints[i].info;
        let paint = await Material.findByCode(paintCode);
        newRecipe.addPaint(paint, info);
    }

    return await newRecipe.save();
}

module.exports = {
    fetchAllRecipes: fetchAllRecipes,
    addRecipe, addRecipe
}