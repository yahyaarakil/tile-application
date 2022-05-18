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

    static async findBy(key, value) {
        try {
            let [results] = await dbConnection.makeQuery(`SELECT * FROM TileUsers WHERE ${key}=?;`, [ value ]);
            if (results.length > 0) {
                let user = results[0];
                user.inDB = true;
                // populate PhoneNumbers
                let [readPhoneNumbers] = await dbConnection.makeQuery(
                    'SELECT TelephoneNumber FROM PhoneNumbers WHERE Email=?;',
                    [ user.Email ]
                );
                user.TelephoneNumbers = [];
                for (let index = 0; index < readPhoneNumbers.length; index++) {
                    const element = readPhoneNumbers[index];
                    user.TelephoneNumbers.push(element.TelephoneNumber);
                }
                return new User(user);
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    static async findByEmail(email) {
        return await this.findBy('Email', email);
    }

    static async findBySessionID(sessionID) {
        let [results] = await dbConnection.makeQuery('SELECT * FROM SessionIDs WHERE SessionID=?', [ sessionID ]);
        if (results.length > 0) {
            return await this.findBy('Email', results[0].Email);
        } else {
            return null;
        }
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery(
                    'UPDATE TileUsers SET Email=?, Password=?, FullName=?, Role=? WHERE Email=?;',
                    [ this.email, this.password, this.fullName, this.role, this.email ]
                );
            } else {
                await dbConnection.makeQuery(
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
            return this;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;