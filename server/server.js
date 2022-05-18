require('dotenv').config();
const express = require('express');
const createTables = require('./db/create_tables').createTables;
const User = require('./db/models/user');
const Deparment = require('./db/models/department');

const app = express();

app.listen(process.env.HTTPS_PORT, async () => {
    console.log('Starting server');
    await createTables();

    // let user = await User.findByEmail('oguzkaganaltas@gmail.com');
    // console.log(user);
    
    // let user = await User.findByEmail('oguzkaganaltas@gmail.com');
    let user = await User.findBySessionID('123');
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
});
