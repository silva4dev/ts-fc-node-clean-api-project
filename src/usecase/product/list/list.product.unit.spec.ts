import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test for list product use case", () => {
  let product: Product;
  let product2: Product;
  let MockRepository: () => ProductRepositoryInterface;

  beforeEach(() => {
    product = ProductFactory.create("a", "Product 1", 10) as Product;
    product2 = ProductFactory.create("b", "Product 2", 20) as Product;

    MockRepository = () => {
      return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest
          .fn()
          .mockReturnValue(Promise.resolve([product, product2])),
      };
    };
  });

  it("should list a product", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);
    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product.id);
    expect(output.products[0].name).toBe(product.name);
    expect(output.products[0].price).toBe(product.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
