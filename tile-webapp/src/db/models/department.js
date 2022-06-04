const dbConnection = require('../db_connection');
const User = require('./user');

class Department {
    constructor ({ ID, Name, Manager, inDB }) {
        this.id = ID;
        this.name = Name;
        this.manager = Manager;
        this.inDB = inDB ? inDB : false;
    }

    static async findByID(value) {
        try {
            let [results] = await dbConnection.makeQuery(`SELECT * FROM Departments WHERE ID=?;`, [ value ]);
            if (results.length > 0) {
                let dept = results[0];
                dept.inDB = true;
                // populate manager
                dept.Manager = await User.findByEmail(dept.Manager);
                return new Department(dept);
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery(
                    'UPDATE Departments SET Name=?, Manager=? WHERE ID=?;',
                    [ this.name, this.manager.email, this.id ]
                );
            } else {
                let [res] = await dbConnection.makeQuery(
                    'INSERT INTO Departments (Name, Manager) VALUES (?, ?);',
                    [ this.name, this.manager.email ]
                );
                this.inDB = true;
                this.id = res.insertId;
            }
            return this;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Department;