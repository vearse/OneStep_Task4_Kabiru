import { Sequelize } from 'sequelize';
import initializeUser from '../models/user';


// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Authenticate Sequelize connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database 🛠️.');
  })
  .catch((err) => {
    console.error('Error connecting to the database: ', err);
  });

const db: {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  models: { [key: string]: any };
} = {
  sequelize,
  Sequelize,
  models: {},
};

// Import and initialize models
db.models.User = initializeUser(sequelize);

// Setup model associations if any
Object.keys(db.models).forEach((key) => {
  if ('associate' in db.models[key]) {
    db.models[key].associate(db.models);
  }
});

// Sync database schema
db.sequelize
  .sync({ force: false, alter: true })
  .then(() => { 
    console.log('Re-sync completed 🌟🌟.');
  });

export default db;