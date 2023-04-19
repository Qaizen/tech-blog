// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// load environment variables from .env file
require('dotenv').config();

// create connection to our database using Sequelize
const sequelize = process.env.JAWSDB_URL // check if the JAWSDB_URL environment variable is set
  ? new Sequelize(process.env.JAWSDB_URL) // if it is set, use the JawsDB MySQL database
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { // if not, use the local MySQL database
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize; // export the connection object for use in other parts of the application
