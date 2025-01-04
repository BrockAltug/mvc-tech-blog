const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Render environment: Use the DATABASE_URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL for secure connection
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
  });
} else {
  // Local development: Use environment variables from .env file
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