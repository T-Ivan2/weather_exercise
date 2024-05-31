const pool = require('../DBManagement/DatabaseConnection');
const queries = require('../DBManagement/queries')
const init = async () => {
    console.log('init');
    try {
        /*
        console.log('test0');
        console.log(queries.cityTableExist);
        const cityExistsResult = await pool.query(queries.cityTableExist);
        const cityExists = cityExistsResult.rows[0].exists;

        const conditionExistsResult = await pool.query(queries.conditionTableExist);
        const conditionExists = conditionExistsResult.rows[0].exists;

        const temperatureExistsResult = await pool.query(queries.temperatureTableExist);
        const temperatureExists = temperatureExistsResult.rows[0].exists;
*/
        console.log('test1');
    //    if (!cityExists){
            console.log('test2');
        await pool.query(CREATE_CITY);
        console.log('Table City has been created.');
     //   }

    //    if (!conditionExists){
        await pool.query(CREATE_CONDITION);
        console.log('Table Condition has been created.');
        //}

       // if(!temperatureExists){
        await pool.query(CREATE_TEMPERATURE);
        console.log('Table Temperature has been created.');
       // }
        for (const query of queries.INSERT_CITY) {
            await pool.query(query);
        }
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}

init();