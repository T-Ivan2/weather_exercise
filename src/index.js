const axios = require('axios');
const queries = require("./DBManagement/queries");
const fs = require('fs');
const pool = require('./DBManagement/DatabaseConnection');

const apiKey = '8b2b861306a8480e93e102003243005';

const getConditionId = (temperature) => {
    if (temperature < 13) { //cold
        return { id: 1, name: 'cold' };
    }
    else if (temperature > 28) { //warm
        return { id: 2, name: 'warm' };
    } else { //mild
        return { id: 3, name: 'mild' };
    }
};

const meteo = async () => {
    try {

        const cityRow = await pool.query(`SELECT * from City`);

        for (const city of cityRow.rows) {

            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.name}`;
            const response = await axios.default.get(url);

            const { temp_c, humidity, last_updated } = response.data.current;
            const condition = getConditionId(temp_c,);

            const insertTemperature = queries.getQueryInsertTemperature();
            await pool.query(insertTemperature, [city.id, condition.id, temp_c, humidity, last_updated]);

            console.log(`Città: ${city.name}`);
            console.log(`Temperatura: ${temp_c} °C`);
            console.log(`Condizione: ${condition.name}`);
            console.log(`Umidità: ${humidity}%`);
            console.log(`Orario: ${last_updated} \n`);

        }
    } catch (err) {
        console.log(err, 'errore wow');
    }
}
meteo();

