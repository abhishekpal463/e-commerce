const ProductService = require("../service/product.service");
class ProductController {
  static async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async getProductDetail(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductDetail(id);
      res.json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async updateProductDetail(req, res) {
    const { id } = req.params;
    const data = req.body;
    const product = await ProductService.updateProductDetail(id, data);
    res.json(product);
  }

  static async deleteProductDetail(req, res) {
    const { id } = req.params;
    const product = await ProductService.deleteProduct(id);
    res.json(product);
  }
}

module.exports = ProductController;
