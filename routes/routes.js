const express = require("express");
const Router = express.Router({ mergeParams: true });
const ProductController = require("../controller/product.controller");
const { getProfile } = require("../middleware/middleware");

Router.post("/products", ProductController.createProduct);
Router.get("/products/:id", ProductController.getProductDetail);
Router.put("/products/:id", ProductController.updateProductDetail);
Router.delete("/products/:id", ProductController.deleteProductDetail);

module.exports = Router;