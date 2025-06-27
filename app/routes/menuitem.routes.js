module.exports = app => {
  const menuitems = require("../controllers/menuitems.controller");

  var router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: MenuItems
   *   description: Menu item management
   */

  /**
   * @swagger
   * /menuitems:
   *   post:
   *     summary: Create a new MenuItem
   *     tags: [MenuItems]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - item_name
   *               - price
   *               - category
   *               - created_by
   *               - restaurantId
   *             properties:
   *               item_name:
   *                 type: string
   *                 example: "Margherita Pizza"
   *               price:
   *                 type: number
   *                 example: 12.99
   *               category:
   *                 type: string
   *                 example: "Pizza"
   *               description:
   *                 type: string
   *                 example: "Classic pizza with tomato sauce and mozzarella."
   *               photo:
   *                 type: string
   *                 example: "https://example.com/pizza.jpg"
   *               created_by:
   *                 type: string
   *                 example: "admin"
   *               updated_by:
   *                 type: string
   *                 example: "admin"
   *               restaurantId:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: MenuItem created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MenuItem'
   */
  router.post("/", menuitems.createUnderRestaurant);

  /**
   * @swagger
   * /menuitems:
   *   get:
   *     summary: Retrieve all MenuItems
   *     tags: [MenuItems]
   *     parameters:
   *       - in: query
   *         name: item_name
   *         schema:
   *           type: string
   *         description: Filter by item name
   *     responses:
   *       200:
   *         description: List of menu items
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/MenuItem'
   */
  router.get("/", menuitems.findAll);

  /**
   * @swagger
   * /menuitems/{id}:
   *   get:
   *     summary: Retrieve a single MenuItem by ID
   *     tags: [MenuItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: MenuItem found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MenuItem'
   *       404:
   *         description: MenuItem not found
   */
  router.get("/:id", menuitems.findOne);

  /**
   * @swagger
   * /menuitems/{id}:
   *   put:
   *     summary: Update a MenuItem by ID
   *     tags: [MenuItems]
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
   *               item_name:
   *                 type: string
   *                 example: "Margherita Pizza"
   *               price:
   *                 type: number
   *                 example: 13.99
   *               category:
   *                 type: string
   *                 example: "Pizza"
   *               description:
   *                 type: string
   *                 example: "Updated description."
   *               photo:
   *                 type: string
   *                 example: "https://example.com/pizza.jpg"
   *               updated_by:
   *                 type: string
   *                 example: "admin"
   *     responses:
   *       200:
   *         description: MenuItem updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MenuItem'
   *       404:
   *         description: MenuItem not found
   */
  router.put("/:id", menuitems.update);

  /**
   * @swagger
   * /menuitems/{id}:
   *   delete:
   *     summary: Delete a MenuItem by ID
   *     tags: [MenuItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: MenuItem deleted successfully
   *       404:
   *         description: MenuItem not found
   */
  router.delete("/:id", menuitems.delete);

  /**
   * @swagger
   * /menuitems:
   *   delete:
   *     summary: Delete all MenuItems
   *     tags: [MenuItems]
   *     responses:
   *       200:
   *         description: All menu items deleted successfully
   */
  router.delete("/", menuitems.deleteAll);

  /**
   * @swagger
   * /menuitems/category/{category}:
   *   get:
   *     summary: Retrieve all MenuItems by category
   *     tags: [MenuItems]
   *     parameters:
   *       - in: path
   *         name: category
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of menu items in the specified category
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/MenuItem'
   */
  router.get("/category/:category", menuitems.findAllByCategory);

  /**
   * @swagger
   * /menuitems/findAllByRestaurant/{restaurant_id}:
   *   get:
   *     summary: Retrieve all MenuItems by restaurant_id
   *     tags: [MenuItems]
   *     parameters:
   *       - in: path
   *         name: restaurant_id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of menu items for the specified restaurant
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/MenuItem'
   */
  router.get("/findAllByRestaurant/:restaurant_id", menuitems.findAllByRestaurant);

  app.use('/api/menuitems', router);
};

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         item_name:
 *           type: string
 *           example: "Margherita Pizza"
 *         price:
 *           type: number
 *           example: 12.99
 *         category:
 *           type: string
 *           example: "Pizza"
 *         description:
 *           type: string
 *           example: "Classic pizza with tomato sauce and mozzarella."
 *         photo:
 *           type: string
 *           example: "https://example.com/pizza.jpg"
 *         created_by:
 *           type: string
 *           example: "admin"
 *         updated_by:
 *           type: string
 *           example: "admin"
 *         restaurantId:
 *           type: integer
 *           example: 1
 */
