const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

let sequelize;

if (process.env.DATABASE_URL) {
  // Render environment: Use the DATABASE_URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Enable SSL
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    },
  });
} else {
  // Local development: Use .env variables
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PASSWORD, // Database password
    {
      host: 'localhost', // Localhost for development
      dialect: 'postgres', // PostgreSQL dialect
      port: 5432, // Default PostgreSQL port
    }
  );
}

module.exports = sequelize;