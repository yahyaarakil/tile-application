require('dotenv').config();
const express = require('express');
const createTables = require('./db/create_tables').createTables;
const User = require('./db/models/user');

const app = express();

app.listen(process.env.HTTPS_PORT, async () => {
    console.log('Starting server');
    await createTables();

    // let user = await User.findByEmail('oguzkaganaltas@gmail.com');
    // console.log(user);
    
    let user = await User.findByEmail('oguzkaganaltas@gmail.com');
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
    user.telephoneNumbers.push('5');
    console.log(user);
    await user.save();
    console.log(user);
});
