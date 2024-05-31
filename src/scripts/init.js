const pool = require("../DBManagement/DatabaseConnection");
const queries = require("../DBManagement/queries");

const init = async () => {
    try {
        await pool.query(queries.CREATE_CITY);

        await pool.query(queries.CREATE_CONDITION);

        await pool.query(queries.CREATE_TEMPERATURE);

        const citiesToInsert = ['torino', 'reykjavik', 'bardai', ' Hong kong', 'New York'];
        for (const city of citiesToInsert) {
            const formattedCity = city.toLowerCase().trim();
            const cityExist = `SELECT * FROM City where name = $1`;
            const res = await pool.query(cityExist, [formattedCity])

            if (res.rowCount === 0) {
                const insertCity = queries.getQueryInsertCity(formattedCity);
                await pool.query(insertCity, [formattedCity]);
                console.log(`la città ${formattedCity} è stata inserita`);
            };
        }

        const conditionToInsert = ['cold', 'warm', 'mild']
        for (const condition of conditionToInsert) {
            const formattedCondition = condition.toLowerCase().trim();
            const conditionExist = `SELECT * FROM Condition where name = $1`;
            const res = await pool.query(conditionExist, [formattedCondition])

            if (res.rowCount === 0) {
                const insertCondition = queries.getQueryInsertCondition(formattedCondition);
                await pool.query(insertCondition, [formattedCondition]);
                console.log(`la condizione ${formattedCondition} è stata inserita`);
            };
        }

        process.exit(0);

    } catch (err) {
        console.error("Error creating tables:", err);
    }
};

init();
