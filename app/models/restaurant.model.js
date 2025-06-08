const { PASSWORD } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
  const MenuItem = sequelize.define("restaurant", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
       username: {
      type: Sequelize.TEXT
      ,  unique: true,
      allowNull: false
    },
       PASSWORD: {
      type: Sequelize.TEXT
      ,allowNull: false
      
    },
    description: {
      type: Sequelize.TEXT
    },
      phone_number: {
      type: Sequelize.TEXT
    },
    logo: {
      type: Sequelize.STRING // this can hold a URL or path to image
    },
       status: {
      type: Sequelize.STRING // this can hold a URL or path to image
    },
         rating: {
      type: Sequelize.STRING // this can hold a URL or path to image
    },
    created_by: {
      type: Sequelize.STRING,
      allowNull: false
    },
    updated_by: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true  // disable Sequelize auto timestamps if you're handling manually
  });

  return MenuItem;
};


