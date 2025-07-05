module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define("menu_item", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    photo: {
      type: DataTypes.STRING
    },
    created_by: {
      type: DataTypes.STRING
    },
    updated_by: {
      type: DataTypes.STRING
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active" // default to active
    }
  });

  return MenuItem;
};
