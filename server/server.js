require('dotenv').config();
const express = require('express');
const createTables = require('./db/create_tables').createTables;
const User = require('./db/models/user');
const Deparment = require('./db/models/department');
const Recipe = require('./db/models/recipe');
const Material = require('./db/models/material');
const Comment = require('./db/models/comment');
const app = express();

app.listen(process.env.HTTPS_PORT, async () => {
    console.log('Starting server');
    await createTables();


    // let material = new Material({
    //     Code: 3,
    //     Company: "Comadsadpany My",
    //     Name: "Boyasdasa",
    //     Price: 123,
    //     Alternative: {
    //         Code:1
    //     }
    // });

    // console.log(material);
    // await material.save();
    // console.log(material);

    // let user = await User.findByEmail('oguzkaganaltas@gmail.com');
    // console.log(user);
    
    // let user = await User.findByEmail('oguzkaganaltas@gmail.com');
    // let user = await User.findBySessionID('123');
    // let user = new User({
    //     Email: 'oguzkaganaltas@gmail.com',
    //     Password: 'lol123',
    //     FullName: 'Oguz Kagan Altas',
    //     Role: 0,
    //     TelephoneNumbers: [
    //         '1',
    //         '2'
    //     ]
    // });
    // console.log(user);
    // await user.save();
    // console.log(user);

    // let dept = new Deparment({
    //     Name: 'RD',
    //     Manager: user
    // });
    // console.log(dept);
    // await dept.save();
    // console.log(dept);

    // let recipe = new Recipe({
    //     Name: 'recipe2',
    //     Size: '3x3',
    //     CreatedBy: user,
    //     MoldShape: 'moldshape1',
    //     BakerName: 'baker1',
    //     InitTemp: 25.5,
    //     Humidity: 20,
    //     DryingDuration: 50,
    //     DryingTemp: 90,
    //     BakingDuration: 120,
    //     BakingTemp: 50
    // });
    // await recipe.save();

    let user = await User.findByEmail("oguzkaganaltas@gmail.com");

    let recipe = await Recipe.findByID(1);

    console.log(user);
    console.log(recipe);

    let comment = new Comment({
        Comment: "very good",
        Manager: user,
        Recipe: recipe
    })
    await comment.save();


    // let recipe1 = await Recipe.findByID(1);
    // let recipe2 = await Recipe.findByID(2);
    // recipe2.previousVersion = recipe1;
    // recipe2.save();
    // console.log(recipe2);
});
