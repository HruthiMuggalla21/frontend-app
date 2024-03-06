const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'demo_project',
    password: 'hruthi1107',
    port: 5432
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = pool;