const ProductRepository = require("../../repository/product.repository");
const ProductService = require("../../service/product.service");

describe("Product Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getProductDetail", () => {
    it("Fetch product detail", async () => {
      const productId = "1234";
      const productDetail = {
        productId,
        category: "test",
        description: "new desc",
        createdAt: "2024-07-16T07:53:23.124Z",
        updatedAt: "2024-07-16T12:43:49.932Z",
      };

      ProductRepository.getProductByID = jest
        .fn()
        .mockResolvedValueOnce(productDetail);

      const result = await ProductService.getProductDetail(productId);

      expect(result.productId).toBe(productId);
    });
  });
});
