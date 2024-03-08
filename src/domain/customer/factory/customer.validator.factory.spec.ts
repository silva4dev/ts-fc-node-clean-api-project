import Customer from "../entity/customer";
import CustomerValidatorFactory from "./customer.validator.factory";

describe("Customer validator factory unit test", () => {
  it("should validate customer", async () => {
    expect(() => {
      const customer = new Customer("", "");
      CustomerValidatorFactory.create().validate(customer);
    }).toThrowError("customer: Id is required,customer: Name is required");
  });
});
