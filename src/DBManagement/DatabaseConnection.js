const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'test'
})

module.exports = pool;