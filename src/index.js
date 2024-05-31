const axios = require('axios');
const queries = require("./DBManagement/queries");
const fs = require('fs');
const pool = require('./DBManagement/DatabaseConnection');

const apiKey = '8b2b861306a8480e93e102003243005';
const meteo = async() => {
    try{

        const cityRow = await pool.query(`SELECT * from City`);
        
        console.log(cityRow.rows);

        for (const city of cityRow.rows){
            console.log(city.name);
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.name}`;
            const response = await axios.default.get(url);
            console.log(response.data.location.country)
            // recupera temperatura
            // calcolati se fa condizioni
            // salva nella tabella di join
            //console.log(response.data.location.country)
        }
    } catch(err){
        console.log(err, 'errore wow');
    }
}
meteo();
  
