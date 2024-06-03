const axios = require('axios');
const queries = require("./DBManagement/queries");
const fs = require('fs');
const pool = require('./DBManagement/DatabaseConnection');
//const direction = require('./types/enums')
const apiKey = '8b2b861306a8480e93e102003243005';

const getConditionId = async (temperature) => {
    const conditionQuery = 'SELECT id FROM Condition WHERE name = $1';

    let conditionName;

    if (temperature < 13) {
        conditionName = 'cold';
    } else if (temperature > 25) {
        conditionName = 'warm';
    } else {
        conditionName = 'mild';
    }

    const res = await pool.query(conditionQuery, [conditionName]);
    return res.rows[0].id;
};


const meteo = async () => {
    try {

        const cityRow = await pool.query(`SELECT * from City`);

        for (const city of cityRow.rows) {

            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.name}`;
            const response = await axios.default.get(url);

            const { temp_c, humidity, last_updated } = response.data.current;
            const condition = await getConditionId(temp_c,);

            const insertTemperature = queries.getQueryInsertTemperature();
            // modificare last update, prendere il parametro last_updated_epoch
            await pool.query(insertTemperature, [city.id, condition, temp_c, humidity, last_updated]);

            const conditionQuery = 'SELECT name FROM Condition WHERE id = $1';
            const res = await pool.query(conditionQuery, [condition]);
            const conditionName = res.rows[0].name;

            console.log(`Città: ${city.name}`);
            console.log(`Temperatura: ${temp_c} °C`);
            console.log(`Condizione: ${conditionName}`);
            console.log(`Umidità: ${humidity}%`);
            console.log(`Orario: ${last_updated} \n`);

        }
    } catch (err) {
        console.log(err, 'errore wow');
    }
}
meteo();

