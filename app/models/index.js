const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
let sequelize;

if (dbConfig.URL) {
  // If using a single URL
  sequelize = new Sequelize(dbConfig.URL, {
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Using individual config values
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.menu_items = require("./menu_item.model.js")(sequelize, Sequelize);

module.exports = db;
