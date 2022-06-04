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

    static constructMaterials(results) {
        if (results.length > 0) {
            let materials = [];
            for (let index = 0; index < results.length; index++) {
                const material = results[index];
                material.inDB = true;
                materials.push(new Material(material));
            }
            return materials;
        }
        else {
            return [];
        }
    }

    static async findBy(key, value) {
        try {
            let [results] = await dbConnection.makeQuery(`SELECT * FROM Materials WHERE ${key}=?;`, [value]);
            if (results.length > 0) {
                let material = results[0];
                material.inDB = true;

                if (material.Alternative !== null) {
                    material.Alternative = await Material.findByCode(material.Alternative);
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

    static async getMaterials(from, to) {
        let count = to - from + 1;
        let [results] = await dbConnection.makeQuery('SELECT * FROM Materials ORDER BY Company, Name LIMIT ?, ?', [ from, count ]);
        return Material.constructMaterials(results);
    }

    static async getMaterialsCount() {
        try {
            let [results] = await dbConnection.makeQuery('SELECT COUNT(Code) AS noMaterials FROM Materials');
            return results[0].noMaterials;
        } catch (error) {
            throw error;
        }
    }

    static async findByCode(code) {
        return await this.findBy('Code', code);
    }

    async save() {
        try {
            if (this.inDB) {
                await dbConnection.makeQuery('UPDATE Materials SET Company=?, Name=?, Price=?, Alternative=?, WHERE Code=?;', [this.company, this.name, this.price, this.alternative.code, this.code]);
            } 
            else {
                await dbConnection.makeQuery(
                    'INSERT INTO Materials (Code, Company, Name, Price, Alternative) VALUES (?, ?, ?, ?, ?);',
                    [this.code, this.company, this.name, this.price, this.alternative ? this.alternative.code : null]
                );
                this.inDB = true;
            }
            return this;
        } catch (error) {
            throw error;
        }
    }


}
module.exports = Material;