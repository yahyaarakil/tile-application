const mysql = require('mysql2/promise');

// create pool
pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
});

const makeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.execute(query, params).then(([ rows, fields ]) => {
            resolve([ rows, fields ]);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    makeQuery: makeQuery,
}