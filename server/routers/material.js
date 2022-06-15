const materialController = require('../controllers/material');
const express = require('express');

let router = express.Router();

router.get('/materials', async (req, res) => {
    res.status(200).json(await materialController.fetchAllMaterials());
});

module.exports = router;