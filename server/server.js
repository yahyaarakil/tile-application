require('dotenv').config();
const express = require('express');
const createTables = require('./db/create_tables').createTables;
const app = express();

const recipeRouter = require('./routers/recipe');
const userRouter = require('./routers/user');

app.use(recipeRouter);
app.use(userRouter);

app.listen(process.env.HTTPS_PORT, async () => {
    console.log('Starting server');
    await createTables();
});