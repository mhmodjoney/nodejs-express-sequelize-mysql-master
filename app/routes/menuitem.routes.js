module.exports = app => {
  const menuitems = require("../controllers/menuitems.controller");

  var router = require("express").Router();

  /**
   * @swagger
   * /menuitems:
   *   post:
   *     summary: Create a new MenuItem
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               price:
   *                 type: number
   *               category:
   *                 type: string
   *     responses:
   *       201:
   *         description: MenuItem created successfully
   */
  router.post("/", menuitems.create);

  /**
   * @swagger
   * /menuitems:
   *   get:
   *     summary: Retrieve all MenuItems
   *     responses:
   *       200:
   *         description: List of menu items
   */
  router.get("/", menuitems.findAll);

  /**
   * @swagger
   * /menuitems/{id}:
   *   get:
   *     summary: Retrieve a single MenuItem by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: MenuItem found
   *       404:
   *         description: MenuItem not found
   */
  router.get("/:id", menuitems.findOne);

  /**
   * @swagger
   * /menuitems/{id}:
   *   put:
   *     summary: Update a MenuItem by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               price:
   *                 type: number
   *               category:
   *                 type: string
   *     responses:
   *       200:
   *         description: MenuItem updated successfully
   *       404:
   *         description: MenuItem not found
   */
  router.put("/:id", menuitems.update);

  /**
   * @swagger
   * /menuitems/{id}:
   *   delete:
   *     summary: Delete a MenuItem by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
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
   *     parameters:
   *       - in: path
   *         name: category
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of menu items in the specified category
   */
  router.get("/category/:category", menuitems.findAllByCategory);


    /**
   * @swagger
   * /menuitems/findAllByRestaurant/{restaurant_id}:
   *   get:
   *     summary: Retrieve all MenuItems by restaurant_id
   *     parameters:
   *       - in: path
   *         name: restaurant_id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of menu items in the specified category
   */
  router.get("/findAllByRestaurant/:restaurant_id", menuitems.findAllByRestaurant);


  app.use('/api/menuitems', router);
};
