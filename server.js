const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const seedDatabase = require('./seeds/seed'); // Import the seed script

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const startServer = async () => {
  try {
    const forceSync = process.env.FORCE_SYNC === 'true';

    await sequelize.sync({ force: forceSync });
    console.log('Database synced successfully');

    if (forceSync && process.env.SEED_DB === 'true') {
      console.log('Seeding database...');
      await seedDatabase();
      console.log('Database seeded successfully');
    }

    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();