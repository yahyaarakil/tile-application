const experss = require('express');
const User = require('../db/models/user');

module.exports = async (req, res, next) => {
    if (req.header('token')) {
        let user = await User.findBySessionID(req.header('token'));
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(403).send('Unauthorized');
        }
    } else {
        res.status(403).send('Unauthorized');
    }
}