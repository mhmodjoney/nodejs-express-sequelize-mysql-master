const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

let sequelize;

if (dbConfig.URL) {
  sequelize = new Sequelize(dbConfig.URL, {
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  });
} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.restaurant = require("./restaurant.model.js")(sequelize, Sequelize);
db.menu_item = require("./menu_item.model.js")(sequelize, Sequelize);

// Setup relationships
db.restaurant.hasMany(db.menu_item, { foreignKey: 'restaurantId' });
db.menu_item.belongsTo(db.restaurant, { foreignKey: 'restaurantId' });

module.exports = db;
