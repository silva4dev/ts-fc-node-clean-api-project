import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test find product use case", () => {
  let product: Product;
  let MockRepository: () => ProductRepositoryInterface;

  beforeEach(() => {
    product = new Product("123", "Product 1", 20);

    MockRepository = () => {
      return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
      };
    };
  });

  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);
    const input = {
      id: "123",
    };
    const ouput = {
      id: "123",
      name: "Product 1",
      price: 20,
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(ouput);
  });
});
