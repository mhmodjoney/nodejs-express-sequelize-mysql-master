module.exports = (sequelize, Sequelize) => {
  const MenuItem = sequelize.define("menu_item", {
    item_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    photo: {
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


