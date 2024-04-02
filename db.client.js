const { Sequelize } = require('sequelize')

// database
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
    sequelize.sync().catch((error) => console.log("Cannot sync the database:", error));
  })
  .catch((error) => console.log("Cannot connect to database, please check environment credentials:", error));

module.exports = sequelize;
