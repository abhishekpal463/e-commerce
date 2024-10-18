const ProductRepository = require("../repository/product.repository");

class ProductService {
  /**
   * create Product with details
   */
  static async createProduct(payload) {
    return await ProductRepository.createProduct(payload);
  }

  /**
   * Fetch Product by productId
   */
  static async getProductDetail(productId) {
    const productDetail = await ProductRepository.getProductByID(productId);
    return productDetail;
  }

  /**
   * Update Product by productId
   */
  static async updateProductDetail(productId, updatedData) {
    return await ProductRepository.updateProductByID(productId, updatedData);
  }

  /**
   * Delete Product by productId
   */
  static async deleteProduct(productId) {
    return await ProductRepository.deleteProductByID(productId);
  }
}

module.exports = ProductService;
