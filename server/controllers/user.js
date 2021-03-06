const User = require('../db/models/User');

const fetchAllUsers = async () => {
    users = await User.getAll();
    for(var i = 0; i < users.length; i++) {
        delete users[i]['password'];
    }
    return users;
}

const registerUser = async (user) => {
    newUser = await User.findByEmail(user.email);
    if (newUser) {
        return false;
    }

    newUser = new User(user);
    await newUser.save();
    return newUser;
}

const loginUser = async (user) => {
    let newUser = await User.findByEmail(user.Email);
    if (newUser) {
        if (newUser.password === user.Password) {
            let sessionID = await newUser.createSession();
            return {
                sessionID: sessionID,
                user: newUser
            };
        }
        return false;
    }
    return false;
}

module.exports = {
    fetchAllUsers: fetchAllUsers,
    registerUser: registerUser,
    loginUser: loginUser
}