import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Integration Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);
    const product = new Product("123", "Product 1", 20);
    await productRepository.create(product);
    const input = {
      id: "123",
      name: "Product 1",
      price: 20,
    };
    const ouput = {
      products: [
        {
          id: "123",
          name: "Product 1",
          price: 20,
        },
      ],
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(ouput);
  });
});
