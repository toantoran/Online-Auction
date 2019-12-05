const mysql = require('mysql');
const util = require('util');


const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '0569',
    database: 'online_auction'
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: (query) => mysql_query(query)
};