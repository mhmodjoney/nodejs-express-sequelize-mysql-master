/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management
 */

module.exports = app => {
  const restaurants = require("../controllers/restaurant.controller.js");

  const router = require("express").Router();



    /**
   * @swagger
   * /restaurants/login:
   *   post:
   *     summary: Restaurant login
   *     description: Authenticate a restaurant by username and password.
   *     tags: [Restaurants]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               PASSWORD:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful.
   *       400:
   *         description: Missing username or password.
   *       401:
   *         description: Invalid credentials.
   *       500:
   *         description: Server error.
   */
  router.post("/login", restaurants.authenticate);


  /**
   * @swagger
   * /restaurants:
   *   post:
   *     summary: Create a new restaurant
   *     tags: [Restaurants]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               username:
   *                 type: string
   *               PASSWORD:
   *                 type: string
   *               logo:
   *                 type: string
   *               status:
   *                 type: string
   *               created_by:
   *                 type: string
   *     responses:
   *       201:
   *         description: Restaurant created successfully
   *       500:
   *         description: Server error
   */
  router.post("/", restaurants.create);

  /**
   * @swagger
   * /restaurants:
   *   get:
   *     summary: Get all restaurants
   *     tags: [Restaurants]
   *     responses:
   *       200:
   *         description: List of restaurants
   *       500:
   *         description: Server error
   */
  router.get("/", restaurants.findAll);

  /**
   * @swagger
   * /restaurants/{id}:
   *   get:
   *     summary: Get a restaurant by ID
   *     tags: [Restaurants]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Restaurant found
   *       404:
   *         description: Not found
   *       500:
   *         description: Server error
   */
  router.get("/:id", restaurants.findOne);

  /**
   * @swagger
   * /restaurants/{id}:
   *   put:
   *     summary: Update a restaurant by ID
   *     tags: [Restaurants]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               logo:
   *                 type: string
   *               status:
   *                 type: string
   *               updated_by:
   *                 type: string
   *     responses:
   *       200:
   *         description: Restaurant updated
   *       404:
   *         description: Not found
   *       500:
   *         description: Server error
   */
  router.put("/:id", restaurants.update);

  /**
   * @swagger
   * /restaurants/{id}:
   *   delete:
   *     summary: Delete a restaurant by ID
   *     tags: [Restaurants]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Restaurant deleted
   *       404:
   *         description: Not found
   *       500:
   *         description: Server error
   */
  router.delete("/:id", restaurants.delete);

  app.use("/api/restaurants", router);
};
