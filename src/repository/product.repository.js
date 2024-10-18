const {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const dynamoDb = require("../../index");

const { v4: uuidv4 } = require("uuid");

const PRODUCTS_TABLE = "Products";

class ProductRepository {
  /**
   * Fetch Product details by productId
   */
  static async getProductByID(productId) {
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: { ProductId: productId },
    };
    try {
      const result = await dynamoDb.send(new GetCommand(params));
      if (result.Item) {
        return result.Item;
      } else {
        return "Product not found";
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update Product details by productId
   */
  static async updateProductByID(productId, updatedData) {
    const { name, description, price, category, stock } = updatedData;
    const updatedAt = new Date().toISOString();
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: { ProductId: productId },
      UpdateExpression:
        "SET #name = :name, Description = :description, Price = :price, Category = :category, Stock = :stock, UpdatedAt = :updatedAt",
      ExpressionAttributeNames: { "#name": "Name" },
      ExpressionAttributeValues: {
        ":name": name,
        ":description": description,
        ":price": price,
        ":category": category,
        ":stock": stock,
        ":updatedAt": updatedAt,
      },
    };
    try {
      await dynamoDb.send(new UpdateCommand(params));
      return { message: "Product updated successfully" };
    } catch (error) {
      return { error: "Could not update product" };
    }
  }

  /**
   * delete Product details by productId
   */
  static async deleteProductByID(productId) {
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: { ProductId: productId },
    };
    try {
      await dynamoDb.send(new DeleteCommand(params));
      return { message: "Product deleted successfully" };
    } catch (error) {
      return { error: "Could not delete product" };
    }
  }

  /**
   * Create Product
   */
  static async createProduct(productData) {
    const { name, description, price, category, stock } = productData;
    const productId = uuidv4();
    const createdAt = new Date().toISOString();
    const params = {
      TableName: PRODUCTS_TABLE,
      Item: {
        ProductId: productId,
        Name: name,
        Description: description,
        Price: price,
        Category: category,
        Stock: stock,
        CreatedAt: createdAt,
        UpdatedAt: createdAt,
      },
    };
    try {
      await dynamoDb.send(new PutCommand(params));
      return { productId };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductRepository;
