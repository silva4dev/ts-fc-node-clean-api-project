import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Unit test for customer update use case", () => {
  let customer: Customer;
  let input: InputUpdateCustomerDto;
  let MockRepository: () => CustomerRepositoryInterface;

  beforeEach(() => {
    customer = CustomerFactory.createWithAddress(
      "John Doe",
      new Address("Street", 123, "Zip", "City")
    );
    input = {
      id: customer.id,
      name: "John Updated",
      address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
      },
    };
    MockRepository = () => ({
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      update: jest.fn(),
    });
  });

  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
