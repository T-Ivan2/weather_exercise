const axios = require('axios');
const queries = require("./DBManagement/queries");
const fs = require('fs');
const pool = require('./DBManagement/DatabaseConnection');


const meteo = async() => {
    try{

        const cityRow = await pool.query(`SELECT name from City`);
        
        console.log(cityRow.rows);

        for (const city of cityRow.rows){
            console.log(city.name);
            const url = `http://api.weatherapi.com/v1/current.json?key=8b2b861306a8480e93e102003243005&q=${city.name}`;
            const response = await axios.default.get(url);
            console.log(response.data.location.country)
            //console.log(response.data.location.country)
        }
    } catch(err){
        console.log(err, 'errore wow');
    }
}
meteo();
  
