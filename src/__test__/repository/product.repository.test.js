const ProductRepository = require("../../repository/product.repository");
const dynamoDb = require("../../db_connection/dbConnection");

describe("Product Repository", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getProductDetail", () => {
    it("Fetch product detail", async () => {
      const productId = "1234";
      const mockProduct = {
        ProductId: productId,
        Name: "Test Product",
        Category: "Electronics",
      };
      
      jest.spyOn(dynamoDb, 'send').mockResolvedValueOnce({
        Item: mockProduct
      });

      const result = await ProductRepository.getProductByID(productId);

      expect(result.ProductId).toBe(productId);
    });
  });
});
