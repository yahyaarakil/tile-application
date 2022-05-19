const dbConnection = require('../db_connection');

class Material {
    constructor({ Code, Company, Name, Price, Alternative, inDB }) {
        this.code = Code;
        this.company = Company;
        this.name = Name;
        this.price = Price;
        this.alternative = Alternative ? Alternative : null;
        this.inDB = inDB ? inDB : false;
    }

    static async findBy(key, value) {
        try {
            let [results] = await dbConnection.makeQuery(`SELECT * FROM Materials WHERE ${key}=?;`, [value]);
            if (results.length > 0) {
                let material = results[0];
                material.inDB = true;

                if (material.alternative !== null) {
                    material.alternative = await Material.findByCode(material.alternative.Code);
                }
                return new Material(material);
            }
            else {
                return null;
            }

        } catch (error) {
            throw error
        }
    }

    static async findByCode(code) {
        return await this.findBy('Code', code);
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery('UPDATE Materials SET Company=?, Name=?, Price=?, Alternative=?, WHERE Code=?;', [this.company, this.name, this.price, this.alternative.Code, this.code]);
            } else {
                await dbConnection.makeQuery(
                    'INSERT INTO Materials (Code, Company, Name, Price, Alternative) VALUES (?, ?, ?, ?, ?);',
                    [this.code, this.company, this.name, this.price, this.alternative.Code]
                );
                this.inDB = true;
            }

        } catch (error) {
            throw error;
        }
    }


}
module.exports = Material;