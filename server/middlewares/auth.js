const experss = require('express');
const User = require('../db/models/user');

module.exports = async (req, res, next) => {
    if (req.header('session')) {
        let user = await User.findBySessionID(req.header('session'));
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