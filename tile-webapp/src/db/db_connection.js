const mysql = require('mysql2/promise');

// create pool
let pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: "localhost",
    database: "tile_server",
    user: "root",
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