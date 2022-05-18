const dbConnection = require('../db_connection');

class User {
    constructor ({ email, fullName, teleNumber, sessionID }) {
        this.email = email;
        this.fullName = fullName;
        this.teleNumber = teleNumber;
        this.sessionID = sessionID;
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            dbConnection.makeQuery('SELECT * FROM TILE_USER WHERE email = ?', [ email ]).then(([ results ]) => {
                if (results.length > 0) {
                    let user = results[0];
                    resolve(new User(
                        user.email,
                        user.fullName,
                        user.teleNumber,
                        user.sessionID
                    ));
                }
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}
