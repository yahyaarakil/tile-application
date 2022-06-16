const commentController = require('../controllers/comment');
const express = require('express');
const auth = require('../middlewares/auth');

let router = express.Router();

router.get('/comments/:recipeid', async (req, res) => {
    try {
        res.status(200).json(await commentController.fetchCommentsOfRecipe(req.params.recipeid));
    } catch {
        res.status(500).send("ERROR");
    }
});

router.post('/addcomment', auth, async (req, res) => {
    try {
        res.status(200).json(await commentController.addComment(req.body, req.user));
    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR");
    }
});

module.exports = router;