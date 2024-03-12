import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Integration Test update customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const input = {
      id: "123",
      name: "John Doe Updated",
      address: {
        street: "Street Updated",
        city: "City Updated",
        number: 1234,
        zip: "Zip Updated",
      },
    };
    const ouput = {
      id: "123",
      name: "John Doe Updated",
      address: {
        street: "Street Updated",
        city: "City Updated",
        number: 1234,
        zip: "Zip Updated",
      },
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(ouput);
  });
});
