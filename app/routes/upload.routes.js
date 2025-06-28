module.exports = app => {
    const upload = require("../controllers/upload.controller.js");
    const router = require("express").Router();
  
    /**
     * @swagger
     * /api/upload-image:
     *   post:
     *     summary: Upload an image and get its Cloudinary URL
     *     consumes:
     *       - multipart/form-data
     *     parameters:
     *       - in: formData
     *         name: image
     *         type: file
     *         description: The image file to upload.
     *     responses:
     *       200:
     *         description: Image uploaded successfully
     */
    router.post("/upload-image", upload.uploadMiddleware, upload.uploadImage);
  
    app.use("/api", router);
  };
  