import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit test for product update use case", () => {
  let product: Product;
  let input: InputUpdateProductDto;
  let MockRepository: () => ProductRepositoryInterface;

  beforeEach(() => {
    product = ProductFactory.create("a", "Product 1", 20) as Product;

    input = {
      id: product.id,
      name: "Product 1 Updated",
      price: 50,
    };

    MockRepository = () => ({
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
    });
  });

  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
