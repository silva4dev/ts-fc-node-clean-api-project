import ProductFactory from "../factory/product.factory";

describe("Product B unit tests", () => {
  it("should throw error when name is empty", () => {
    expect(() => {
      ProductFactory.create("b", "", 20);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      ProductFactory.create("b", "", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw error when type not supported", () => {
    expect(() => {
      ProductFactory.create("non_existing_type", "Product 1", 20);
    }).toThrowError("Product type not supported");
  });

  it("should change name", () => {
    const product = ProductFactory.create("b", "Product 1", 20);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = ProductFactory.create("b", "Product 1", 20);
    product.changePrice(200);
    expect(product.price).toBe(400);
  });
});
