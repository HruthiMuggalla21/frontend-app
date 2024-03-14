const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user:process.env.user,
    host:process.env.host,
    database:process.env.database,
    password:process.env.password,
    port:process.env.port
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = pool;