const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

let sequelize;

if (process.env.DATABASE_URL) {
  // For cloud environments (like Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // Local development
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name from .env (techblog_db)
    process.env.DB_USER, // Database username from .env (postgres)
    process.env.DB_PASSWORD, // Database password from .env (password)
    {
      host: 'localhost', // Localhost for local development
      dialect: 'postgres', // PostgreSQL dialect
      port: 5432, // Default PostgreSQL port
    }
  );
}

module.exports = sequelize;