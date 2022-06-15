const recipeController = require('../controllers/recipe');
const express = require('express');

let router = express.Router();

router.get('/recipes', async (req, res) => {
    res.status(200).json(await recipeController.fetchAllRecipes(req.query.unapproved ? true : false));
});

module.exports = router;