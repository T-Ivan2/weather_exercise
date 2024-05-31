const { Pool } = require('pg');

const pool = new Pool({ // IVAN
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: +process.env.PG_PORT
})
module.exports = pool;