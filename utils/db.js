const mysql = require('mysql');
const util = require('util');


const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'sql12.freemysqlhosting.net',
    port: 3306,
    user: 'sql12314720',
    password: 'qT3Czyatrb',
    database: 'sql12314720'
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: (query) => mysql_query(query)
};