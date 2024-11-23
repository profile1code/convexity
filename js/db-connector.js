require('dotenv').config(); // Load environment variables from .env
const mysql = require('mysql');

// Create a connection pool using .env variables
const db = mysql.createConnection({
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10, // Default to 10 if not defined
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

console.log("Successfully connected");

module.exports = db;