"use strict";
const ProductService = require("./src/service/product.service");

module.exports.hello = async (event) => {
  const operation = event.info.fieldName;
  switch (operation) {
    case "getProduct":
      const productId = event.arguments.input.productId;
      return await ProductService.getProductDetail(productId);

    case "createProduct":
      const createPayload = event.arguments.input;
      return await ProductService.createProduct(createPayload);

    case "updateProduct":
      const updatePayload = event.arguments.input;
      const filterProductId = event.arguments.input.productId;
      return await ProductService.updateProductDetail(
        filterProductId,
        updatePayload
      );

    case "deleteProduct":
      const deleteProductId = event.arguments.input.productId;
      return await ProductService.deleteProduct(deleteProductId);

    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Unknown operation" }),
      };
  }
};
