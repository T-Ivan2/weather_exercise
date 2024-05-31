
const CREATE_CITY = `
CREATE TABLE IF NOT EXISTS City (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);`;

const CREATE_TEMPERATURE = `
CREATE TABLE IF NOT EXISTS Temperature (
    id SERIAL PRIMARY KEY,
    city_id INTEGER,
    condition_id INTEGER,
    temperature REAL NOT NULL,
    humidity REAL,
    time TIMESTAMP NOT NULL,
    FOREIGN KEY (city_id) REFERENCES City(id),
    FOREIGN KEY (condition_id) REFERENCES Condition(id)
);`;

const CREATE_CONDITION = `
CREATE TABLE IF NOT EXISTS Condition (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);`;

  const getQueryInsertCity = (city)=>{
        return `INSERT INTO City (name) VALUES ($1)`;
  }

  const getQueryInsertCondition = (condition) =>{
    return `INSERT INTO Condition (name) VALUES ($1)`;
  }



module.exports = {
    CREATE_CITY,
    CREATE_TEMPERATURE,
    CREATE_CONDITION,
    getQueryInsertCity,
    getQueryInsertCondition
};