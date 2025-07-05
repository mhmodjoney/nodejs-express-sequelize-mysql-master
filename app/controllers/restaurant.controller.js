const db = require("../models");
const Restaurant = db.restaurant;

// Authenticate restaurant by username and password
exports.authenticate = async (req, res) => {
  const { username, PASSWORD } = req.body;

  if (!username || !PASSWORD) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const restaurant = await Restaurant.findOne({
      where: { username, PASSWORD, status: "active" }
    });

    if (!restaurant) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    res.json({
      message: "Login successful",
      restaurant: {
        id: restaurant.id,
        name: restaurant.item_name,
        username: restaurant.username,
        created_by: restaurant.created_by,
        status: restaurant.status,
        rating: restaurant.rating
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new restaurant
exports.create = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all active restaurants
exports.findAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one active restaurant by id
exports.findOne = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.params.id, status: "active" }
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update restaurant
exports.update = async (req, res) => {
  try {
    const result = await Restaurant.update(req.body, {
      where: { id: req.params.id }
    });
    if (result[0] === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark restaurant as inactive instead of deleting
exports.delete = async (req, res) => {
  try {
    const result = await Restaurant.update(
      { status: "inactive" },
      { where: { id: req.params.id } }
    );
    if (result[0] === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant marked as inactive successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
