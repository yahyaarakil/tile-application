require('dotenv').config();
const express = require('express');
const createTables = require('./db/create_tables').createTables;
const app = express();

app.use(express.json());
const recipeRouter = require('./routers/recipe');
const userRouter = require('./routers/user');
const materialRouter = require('./routers/material');
const commentRouter = require('./routers/comment');

app.use(recipeRouter);
app.use(userRouter);
app.use(materialRouter);
app.use(commentRouter);

app.listen(process.env.HTTPS_PORT, async () => {
    console.log('Starting server');
    await createTables();
});
