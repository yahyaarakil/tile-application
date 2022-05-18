const dbConnection = require('../db_connection');

class User {
    constructor ({ Email, Password, FullName, Role, TelephoneNumbers, inDB }) {
        this.email = Email;
        this.password = Password;
        this.fullName = FullName;
        this.role = Role;
        this.inDB = inDB ? inDB : false;

        this.telephoneNumbers = [...TelephoneNumbers];
    }

    static async findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            let [results] = await dbConnection.makeQuery('SELECT * FROM TileUsers WHERE Email=?;', [ email ]);
            if (results.length > 0) {
                let user = results[0];
                user.inDB = true;
                // populate PhoneNumbers
                let [readPhoneNumbers] = await dbConnection.makeQuery(
                    'SELECT TelephoneNumber FROM PhoneNumbers WHERE Email=?;',
                    [ email ]
                );
                user.TelephoneNumbers = [];
                for (let index = 0; index < readPhoneNumbers.length; index++) {
                    const element = readPhoneNumbers[index];
                    user.TelephoneNumbers.push(element.TelephoneNumber);
                }
                resolve(new User(user));
            } else {
                resolve(null);
            }
        });
    }

    async save() {
        return new Promise(async (resolve, reject) => {
            if (this.inDB) {
                console.log("UPDATING");
                let user = await dbConnection.makeQuery(
                    'UPDATE TileUsers SET Email=?, Password=?, FullName=?, Role=? WHERE Email=?;',
                    [ this.email, this.password, this.fullName, this.role, this.email ]
                )
            } else {
                console.log("INSERTING");
                let user = await dbConnection.makeQuery(
                    'INSERT INTO TileUsers (Email, Password, FullName, Role) VALUES (?, ?, ?, ?);',
                    [ this.email, this.password, this.fullName, this.role ]
                );
                this.inDB = true;
            }

            await dbConnection.makeQuery(
                'DELETE FROM PhoneNumbers WHERE Email=?;',
                [ this.email ]
            );
            for (let index = 0; index < this.telephoneNumbers.length; index++) {
                const telephoneNumber = this.telephoneNumbers[index];
                await dbConnection.makeQuery(
                    'INSERT INTO PhoneNumbers (Email, TelephoneNumber) VALUES (?, ?);',
                    [ this.email, telephoneNumber ]
                );
            }
            resolve(this);
        });
    }
}

module.exports = User;