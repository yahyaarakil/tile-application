require('dotenv').config();
const express = require('express');
const dbConnection = require('./db/db_connection');

const app = express();

app.listen(process.env.HTTPS_PORT, () => {
    console.log('Starting server');
});
