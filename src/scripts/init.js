const pool = require("../DBManagement/DatabaseConnection");
const queries = require("../DBManagement/queries");

const init = async () => {
  try {
    // await pool.query(queries.cityTableExist);

    // await pool.query(queries.conditionTableExist);

    // await pool.query(queries.temperatureTableExist);

    // await pool.query(CREATE_CITY);
    // console.log("Table City has been created.");

    // await pool.query(CREATE_CONDITION);
    // console.log("Table Condition has been created.");

    // await pool.query(CREATE_TEMPERATURE);
    // console.log("Table Temperature has been created.");
    const citiesToInsert = ['Reykjavik', 'Torino', 'Bardai'];
    for (const city of citiesToInsert) {
        // select per verificare se la città è gia inserita SELECT * from City where name === city
        console.log(queries.getQueryInsertCity(city))
        // inserisco se non esiste INSERT
    }
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

init();
