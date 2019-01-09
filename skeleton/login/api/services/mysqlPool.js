const mysql = require('mysql');
const util = require('util');

/**
 * MySQL pool configuration.
 * Change this to fit your configuration.
 */
var pool = mysql.createPool({
    connectionLimit: 30,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test'
});

/**
 * Simple mysql pool connection function.
 */
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();
});

/**
 * Monkeypatch the query method to work as a promise.
 */
pool.query = util.promisify(pool.query);

/**
 * getUser function for the mysqlUserProvder module.
 */
pool.getUser = (name, password) => pool.query(`SELECT * from rest WHERE username='${name}' AND password='${password}'`);

module.exports = pool;
