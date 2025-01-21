const { Sequelize } = require("sequelize");
require("dotenv").config();

const CONFIG = {
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DIALECT: process.env.DB_DIALECT || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  DB_USE_SSL: process.env.DB_USE_SSL === "true", 
};

const sequelize = new Sequelize(
  CONFIG.DB_NAME,
  CONFIG.DB_USERNAME,
  CONFIG.DB_PASSWORD,
  {
    host: CONFIG.DB_HOST,
    dialect: CONFIG.DB_DIALECT,
    port: CONFIG.DB_PORT,
    logging: false,
    dialectOptions: CONFIG.DB_USE_SSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {}, 
  }
);

if (!CONFIG.DB_NAME || !CONFIG.DB_USERNAME || !CONFIG.DB_PASSWORD || !CONFIG.DB_HOST) {
  throw new Error("Database configuration is incomplete. Please verify your environment variables.");
}

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL database successful");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the PostgreSQL database:", error);
    throw error;
  }
};

// Initialize the database
initializeDatabase();

module.exports = sequelize;
