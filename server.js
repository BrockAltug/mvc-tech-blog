const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const seedDatabase = require('./seeds/seed'); // Import the seed script for optional seeding

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // Session expires after 5 minutes
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use defined routes
app.use(routes);

// Start the server and handle database setup
const startServer = async () => {
  try {
    // Sync database with optional seeding
    const forceSync = process.env.FORCE_SYNC === 'true';
    await sequelize.sync({ force: forceSync });
    console.log('Database synced successfully');

    if (process.env.SEED_DB === 'true') {
      await seedDatabase(); // Seed the database if environment variable is set
      console.log('Database seeded successfully');
    }

    // Start listening on the specified port
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

// Call the startup function
startServer();