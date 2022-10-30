const mysql = require("mysql")

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_DB_CONN_LIMIT,
}

const pool = mysql.createPool(config)

module.exports = pool