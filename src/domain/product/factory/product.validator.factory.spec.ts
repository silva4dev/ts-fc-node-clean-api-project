import Product from "../entity/product";
import ProductValidatorFactory from "./product.validator.factory";

describe("Product validator factory unit test", () => {
  it("should validate product", async () => {
    expect(() => {
      const product = new Product("", "", -10);
      ProductValidatorFactory.create().validate(product);
    }).toThrowError(
      "product: Id is required,product: Name is required,product: Price must be greater than zero"
    );
  });
});
