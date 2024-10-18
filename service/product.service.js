const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const PRODUCTS_TABLE = "Products";

const REGION = "us-east-1";
const dynamoDbClient = new DynamoDBClient({
  region: REGION
});

const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

class ProductService {
  static async createProduct(payload) {
    const { name, description, price, category, stock } = payload;
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
    console.log({ params });
    try {
      await dynamoDb.send(new PutCommand(params));
      return { productId };
    } catch (error) {
      throw error;
    }
  }
  /**
   * Get all unpaid jobs for a user
   * either a client or contractor,
   * for active contracts only
   */
  static async getProductDetail(productId) {
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: { ProductId: productId },
    };
    console.log({ params });
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

  static async updateProductDetail(productId, updatedData) {
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

  static async deleteProduct(productId) {
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
}

module.exports = ProductService;
