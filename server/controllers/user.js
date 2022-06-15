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
    newUser = await User.findByEmail(user.email);
    if (newUser) {
        if (newUser.password === user.password) {
            // newUser.sessionID
            return newUser;
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