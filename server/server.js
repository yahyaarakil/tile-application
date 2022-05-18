require('dotenv').config();
const express = require('express');
const createTables = require('./db/create_tables').createTables;

const app = express();

app.listen(process.env.HTTPS_PORT, () => {
    console.log('Starting server');
    createTables();
});
