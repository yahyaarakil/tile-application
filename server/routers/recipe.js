const recipeController = require('../controllers/recipe');
const express = require('express');
const auth = require('../middlewares/auth');

let router = express.Router();

router.get('/recipes', async (req, res) => {
    try {
        let approval = req.query.unapproved === true ? true : false;
        res.status(200).json(await recipeController.fetchAllRecipes(approval));
    } catch {
        res.status(500).send("ERROR");
    }
});

router.post('/addrecipe', auth, async (req, res) => {
    try {
        res.status(200).json(await recipeController.addRecipe(req.body, req.user));
    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR");
    }
});

module.exports = router;