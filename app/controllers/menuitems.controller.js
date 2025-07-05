const db = require("../models");
const MenuItem = db.menu_item;
const Op = db.Sequelize.Op;

// Find all MenuItems by restaurant id (only active)
exports.findAllByRestaurant = async (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  try {
    const restaurant = await db.restaurant.findByPk(restaurant_id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    if (restaurant.status !== "active") {
      return res.status(403).json({ message: "Restaurant is inactive." });
    }

    const menuItems = await MenuItem.findAll({
      where: { restaurantId: restaurant_id }
    });

    res.send(menuItems);

  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving menu items."
    });
  }
};

// Create and Save a new MenuItem under a restaurant
exports.createUnderRestaurant = (req, res) => {
  if (!req.body.item_name || !req.body.price || !req.body.category || !req.body.created_by || !req.body.restaurantId) {
    return res.status(400).send({
      message: "item_name, price, category, created_by, restaurantId are required."
    });
  }

  const menuItem = {
    item_name: req.body.item_name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    photo: req.body.photo,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
    restaurantId: req.body.restaurantId,
    status: "active"
  };

  MenuItem.create(menuItem)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while creating the MenuItem."
      })
    );
};

// Retrieve all active MenuItems from the database
exports.findAll = (req, res) => {
  const item_name = req.query.item_name;
  const condition = item_name ? { item_name: { [Op.like]: `%${item_name}%` }, status: "active" } : { status: "active" };

  MenuItem.findAll()
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menu items."
      })
    );
};

// Find a single active MenuItem by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MenuItem.findOne({ where: { id: id, status: "active" } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find MenuItem with id=${id}.`
        });
      }
    })
    .catch(err =>
      res.status(500).send({
        message: "Error retrieving MenuItem with id=" + id
      })
    );
};

// Update a MenuItem by id
exports.update = (req, res) => {
  const id = req.params.id;

  MenuItem.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "MenuItem was updated successfully." });
      } else {
        res.status(404).send({
          message: `Cannot update MenuItem with id=${id}. Maybe not found or empty request.`
        });
      }
    })
    .catch(err =>
      res.status(500).send({
        message: "Error updating MenuItem with id=" + id
      })
    );
};

// Soft Delete a MenuItem by id (mark inactive)
exports.delete = (req, res) => {
  const id = req.params.id;

  MenuItem.update({ status: "inactive" }, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "MenuItem was marked inactive successfully!" });
      } else {
        res.status(404).send({
          message: `Cannot mark MenuItem inactive with id=${id}. Not found.`
        });
      }
    })
    .catch(err =>
      res.status(500).send({
        message: "Could not update MenuItem with id=" + id
      })
    );
};

// Delete all MenuItems (if you really need this: use carefully)
exports.deleteAll = (req, res) => {
  MenuItem.destroy({
    where: {},
    truncate: false
  })
    .then(nums =>
      res.send({ message: `${nums} MenuItems were deleted successfully!` })
    )
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while removing all menu items."
      })
    );
};

// Find all active MenuItems by category
exports.findAllByCategory = (req, res) => {
  const category = req.params.category;

  MenuItem.findAll({ where: { category: category, status: "active" } })
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menu items."
      })
    );
};
