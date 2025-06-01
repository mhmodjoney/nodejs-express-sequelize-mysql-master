module.exports = app => {
  const menuitems = require("../controllers/menuitems.controller");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/menuitems:
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
   * /api/menuitems:
   *   get:
   *     summary: Retrieve all MenuItems
   *     responses:
   *       200:
   *         description: List of menu items
   */
  router.get("/", menuitems.findAll);

  /**
   * @swagger
   * /api/menuitems/{id}:
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
   * /api/menuitems/{id}:
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
   * /api/menuitems/{id}:
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
   * /api/menuitems:
   *   delete:
   *     summary: Delete all MenuItems
   *     responses:
   *       200:
   *         description: All menu items deleted successfully
   */
  router.delete("/", menuitems.deleteAll);

  /**
   * @swagger
   * /api/menuitems/category/{category}:
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

  app.use('/api/menuitems', router);
};
