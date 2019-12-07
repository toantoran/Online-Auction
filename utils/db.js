const mysql = require('mysql');
const util = require('util');


const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'sql12.freemysqlhosting.net',
    port: 3306,
    user: 'sql12314720',
    password: 'qT3Czyatrb',
    database: 'sql12314720',
    dateStrings: true
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: (query) => mysql_query(query),
    add: (tableName, entity) => mysql_query(`insert into ${tableName} set ?`, entity),
    del: (tableName, condition) => mysql_query(`delete from ${tableName} where ?`, condition),
    patch: (tableName, entity, condition) => mysql_query(`update ${tableName} set ? where ?`, [entity, condition]),
};