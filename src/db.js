import { Sequelize } from "sequelize";
import Configs from "./configs.js";

const db = new Sequelize(
  Configs.DB_NAME, //db
  Configs.DB_USER, //user
  Configs.PASSWORD, //password
  {
    host: Configs.HOST,
    port: Configs.PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  }
);

(async () => {
  try {    
    await db.authenticate();
    console.log("Connected to PostgreSQL using Sequelize");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default db;
