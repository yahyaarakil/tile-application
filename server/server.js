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

    //------------------------------------------------------------------

    let redPaint = new Material({
        Code: 1,
        Company: "DYO",
        Name: "RED PAINT",
        Price: 102.50
    });

    try {
        await redPaint.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let greenPaint = new Material({
        Code: 2,
        Company: "DYO",
        Name: "GREEN PAINT",
        Price: 82.50
    });

    try {
        await greenPaint.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let bluePaint = new Material({
        Code: 3,
        Company: "FILLI BOYA",
        Name: "BLUE PAINT",
        Price: 222.50
    });

    try {
        await bluePaint.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let glaze1 = new Material({
        Code: 4,
        Company: "GLAZEMASTER",
        Name: "GLAZE a",
        Price: 44.43
    });

    try {
        await glaze1.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let glaze2 = new Material({
        Code: 5,
        Company: "GLAZEMASTER",
        Name: "GLAZE e",
        Price: 542.5,
        Alternative: glaze1
    });

    try {
        await glaze2.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let clay = new Material({
        Code: 6,
        Company: "CLAY",
        Name: "CLAY a",
        Price: 22.5,
    });

    try {
        await clay.save();
    } catch (error) {
        console.log("it is in DB");
    }

    //------------------------------------------------------------------

    let user = new User({
        Email: 'oguzkaganaltas@gmail.com',
        Password: 'lol123',
        FullName: 'Oguz Kagan Altas',
        Role: 0,
        TelephoneNumbers: [
            '1',
            '2'
        ]
    });

    try {
        await user.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let user1 = new User({
        Email: 'yahyaarakil@gmail.com',
        Password: 'lol123lol',
        FullName: 'Yahya Arakil',
        Role: 1,
        TelephoneNumbers: [
            '3'
        ]
    });

    try {
        await user1.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let user2 = new User({
        Email: 'yyeliz@gmail.com',
        Password: 'lol123321lol',
        FullName: 'Yeliz Yeşilada',
        Role: 2,
        TelephoneNumbers: [
            '4'
        ]
    });

    try {
        await user2.save();
    } catch (error) {
        console.log("it is in DB");
    }

    //------------------------------------------------------------------

    let dept = new Deparment({
        Name: 'RD',
        Manager: user
    });

    try {
        await dept.save();
    } catch (error) {
        console.log("it is in DB");
    }
    
    let dept1 = new Deparment({
        Name: 'Planning',
        Manager: user
    });

    try {
        await dept1.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let dept2 = new Deparment({
        Name: 'Production',
        Manager: user
    });

    try {
        await dept2.save();
    } catch (error) {
        console.log("it is in DB");
    }

    //------------------------------------------------------------------

    let recipe = new Recipe({
        Name: 'recipe',
        Size: '3x3',
        CreatedBy: user,
        MoldShape: 'moldshape1',
        BakerName: 'baker1',
        InitTemp: 25.5,
        Humidity: 20,
        DryingDuration: 50,
        DryingTemp: 90,
        BakingDuration: 120,
        BakingTemp: 50,
        Alternative: false
    });
    try {
        await recipe.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let recipe1 = new Recipe({
        Name: 'recipe1',
        Size: '50x60',
        CreatedBy: user,
        MoldShape: 'moldshape3434',
        BakerName: 'baker21',
        InitTemp: 235.5,
        Humidity: 203,
        DryingDuration: 450,
        DryingTemp: 160,
        BakingDuration: 920,
        BakingTemp: 660,
        Alternative: false
    });
    try {
        await recipe1.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let recipe2 = new Recipe({
        Name: 'recipe3',
        Size: '80x60',
        CreatedBy: user,
        MoldShape: 'moldshape34',
        BakerName: 'baker3',
        InitTemp: 215.5,
        Humidity: 210,
        DryingDuration: 150,
        DryingTemp: 910,
        BakingDuration: 1210,
        BakingTemp: 150,
        Alternative: false
    });
    try {
        await recipe2.save();
    } catch (error) {
        console.log("it is in DB");
    }

    //------------------------------------------------------------------

    let comment = new Comment({
        Comment: "very good",
        Manager: user,
        Recipe: recipe
    })
    try {
        await comment.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let comment1 = new Comment({
        Comment: "very bad",
        Manager: user1,
        Recipe: recipe
    })
    try {
        await comment1.save();
    } catch (error) {
        console.log("it is in DB");
    }

    let comment2 = new Comment({
        Comment: "excellent work good",
        Manager: user2,
        Recipe: recipe1
    })
    try {
        await comment2.save();
    } catch (error) {
        console.log("it is in DB");
    }

    //------------------------------------------------------------------

    recipe.addMaterial(clay,{
        amount:104,
        applicationType:"fast",
        waterContent: 123,
        density: 1.23,
        viscosity: 3.12
    })

    recipe.addMaterial(glaze1,{
        amount:34,
        applicationType:"slow",
        waterContent: 75,
        density: 1.23,
        viscosity: 3.12
    })

    recipe.addMaterial(glaze2,{
        amount:104,
        applicationType:"normal",
        waterContent: 66,
        density: 1.2213,
        viscosity: 6.12
    })

    recipe.save();



    recipe1.addMaterial(clay,{
        amount:104,
        applicationType:"fast",
        waterContent: 123,
        density: 1.23,
        viscosity: 3.12
    })

    recipe1.addMaterial(glaze1,{
        amount:34,
        applicationType:"slow",
        waterContent: 75,
        density: 1.23,
        viscosity: 3.12
    })

    recipe1.save();

    recipe2.addMaterial(clay,{
        amount:34,
        applicationType:"slow",
        waterContent: 75,
        density: 1.23,
        viscosity: 3.12
    })

    recipe2.addMaterial(glaze2,{
        amount:104,
        applicationType:"normal",
        waterContent: 66,
        density: 1.2213,
        viscosity: 6.12
    })

    recipe2.save();

    //------------------------------------------------------------------

    recipe.addPaint(redPaint, {
        grammage: 0.512
    })
    recipe1.addPaint(greenPaint, {
        grammage: 0.6666
    })
    recipe2.addPaint(bluePaint, {
        grammage: 0.912
    })

    //------------------------------------------------------------------

    //------------------------------------------------------------------
    console.log(await Material.getMaterials(0,1));
    console.log(await Material.findByCode(3));
    console.log(await Material.getMaterialsCount());

    // try {
    //     let a = await Recipe.findRecipesContainsMaterialCode(1);
    //     console.log(a)
    // } catch (error) {
    //     console.log("it is in DB");
    // }


});
