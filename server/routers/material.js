const materialController = require('../controllers/material');
const express = require('express');

let router = express.Router();

router.get('/materials', async (req, res) => {
    try {
        res.status(200).json(await materialController.fetchAllMaterials());
    } catch {
        res.status(500).send("ERROR");
    }
});

router.post('/addmaterial', async (req, res) => {
    try {
        res.status(200).json(await materialController.addMaterial(req.body));
    } catch {
        res.status(500).send("ERROR");
    }
});

module.exports = router;