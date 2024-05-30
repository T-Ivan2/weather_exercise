const pool = require('../DBManagement/DatabaseConnection');
const queries = require('../DBManagement/queries')
const init = async () => {
    console.log('init');
    try {

        await pool.query(CREATE_CITY);
        console.log('Table City has been created.');

        await pool.query(CREATE_CONDITION);
        console.log('Table Condition has been created.');

        await pool.query(CREATE_TEMPERATURE);
        console.log('Table Temperature has been created.');

        for (const query of queries.INSERT_CITY) {
            await pool.query(query);
        }
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}

init();