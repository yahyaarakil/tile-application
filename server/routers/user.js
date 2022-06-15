const userController = require('../controllers/user');
const express = require('express');

let router = express.Router();

router.get('/users', async (req, res) => {
    res.status(200).json(await userController.fetchAllUsers());
});

router.post('/register', async (req, res) => {
    user = await userController.registerUser(req.body);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({ 'message': 'Error' });
    }
});

router.post('/login', async (req, res) => {
    user = await userController.loginUser(req.body);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({ 'message': 'Error' });
    }
});

// router.delete

module.exports = router;