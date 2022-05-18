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
        return new Promise((resolve, reject) => {
            dbConnection.makeQuery('SELECT * FROM TileUsers WHERE Email=?;', [ email ]).then(([ results ]) => {
                if (results.length > 0) {
                    let user = results[0];
                    user.inDB = true;
                    // populate PhoneNumbers
                    dbConnection.makeQuery(
                        'SELECT TelephoneNumber FROM PhoneNumbers WHERE Email=?;',
                        [ email ]
                    ).then(([ results ]) => {
                        user.TelephoneNumbers = [];
                        for (let index = 0; index < results.length; index++) {
                            const element = results[index];
                            user.TelephoneNumbers.push(element.TelephoneNumber);
                        }
                        resolve(new User(user));
                    }).catch((err) => reject(err));
                } else {
                    resolve(null);
                }
            }).catch((err) => reject(err));
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

            dbConnection.makeQuery(
                'DELETE FROM PhoneNumbers WHERE Email=?;',
                [ this.email ]
            ).then(async () => {
                for (let index = 0; index < this.telephoneNumbers.length; index++) {
                    const telephoneNumber = this.telephoneNumbers[index];
                    await dbConnection.makeQuery(
                        'INSERT INTO PhoneNumbers (Email, TelephoneNumber) VALUES (?, ?);',
                        [ this.email, telephoneNumber ]
                    );
                }
                resolve(this);
            }).catch((err) => reject(err));
        });
    }
}

module.exports = User;