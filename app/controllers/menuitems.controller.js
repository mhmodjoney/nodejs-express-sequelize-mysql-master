const db = require("../models");
const MenuItem = db.menu_items;
const Op = db.Sequelize.Op;

// Create and Save a new MenuItem
exports.create = (req, res) => {
  if (!req.body.item_name || !req.body.price || !req.body.category || !req.body.created_by) {
    res.status(400).send({
      message: "Content can not be empty! (item_name, price, category, created_by are required)"
    });
    return;
  }

  const menuItem = {
    item_name: req.body.item_name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    photo: req.body.photo,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by
  };

  MenuItem.create(menuItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MenuItem."
      });
    });
};

// Retrieve all MenuItems from the database
exports.findAll = (req, res) => {
  const item_name = req.query.item_name;
  var condition = item_name ? { item_name: { [Op.like]: `%${item_name}%` } } : null;

  MenuItem.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu items."
      });
    });
};

// Find a single MenuItem by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MenuItem.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find MenuItem with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving MenuItem with id=" + id
      });
    });
};

// Update a MenuItem by id
exports.update = (req, res) => {
  const id = req.params.id;

  MenuItem.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "MenuItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update MenuItem with id=${id}. Maybe MenuItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating MenuItem with id=" + id
      });
    });
};

// Delete a MenuItem by id
exports.delete = (req, res) => {
  const id = req.params.id;

  MenuItem.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "MenuItem was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete MenuItem with id=${id}. Maybe MenuItem was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete MenuItem with id=" + id
      });
    });
};

// Delete all MenuItems from the database
exports.deleteAll = (req, res) => {
  MenuItem.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} MenuItems were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all menu items."
      });
    });
};

// Find all MenuItems by category
exports.findAllByCategory = (req, res) => {
  const category = req.params.category;

  MenuItem.findAll({ where: { category: category } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu items by category."
      });
    });
};
