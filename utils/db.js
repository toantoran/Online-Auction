const mysql = require('mysql');
const util = require('util');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);
const mysql_query = util.promisify(pool.query).bind(pool);

pool.on('connection', conn => {
    conn.query("SET time_zone='+07:00';", error => {
        if(error){
            throw error
        }
    })
})

module.exports = {
  load: query => mysql_query(query),
  add: (tableName, entity) =>
    mysql_query(`insert into ${tableName} set ?`, entity),
  del: (tableName, condition) =>
    mysql_query(`delete from ${tableName} where ?`, condition),
  patch: (tableName, entity, condition) =>
    mysql_query(`update ${tableName} set ? where ?`, [entity, condition])
};