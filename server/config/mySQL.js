const mysql = require('mysql2');

/**
 * MySQL Database Configuration
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'employee_manage',
    password: 'root',
    port: 3306,
    timezone: 'Z',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();