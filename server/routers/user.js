const userController = require('../controllers/user');
const express = require('express');

let router = express.Router();

router.get('/users', async (req, res) => {
    try {
        res.status(200).json(await userController.fetchAllUsers());
    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR");
    }
});

router.post('/register', async (req, res) => {
    try {
        user = await userController.registerUser(req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(500).json({ 'message': 'Error' });
        }
    } catch{
        res.status(500).send("ERROR");
    }
});

router.post('/login', async (req, res) => {
    try {
        sessionID = await userController.loginUser(req.body);
        if (sessionID) {
            res.status(200).json(sessionID);
        } else {
            res.status(500).json({ 'message': 'Error' });
        }
    } catch (error){
        console.log(error);
        res.status(500).send("ERROR");
    }
});

// router.delete

module.exports = router;