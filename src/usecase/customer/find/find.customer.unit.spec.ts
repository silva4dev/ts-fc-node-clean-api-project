import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Unit test find customer use case", () => {
  let customer: Customer;
  let address: Address;
  let MockRepository: () => CustomerRepositoryInterface;

  beforeEach(() => {
    customer = new Customer("123", "John Doe");
    address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);
    MockRepository = () => {
      return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      };
    };
  });

  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: "123",
    };
    const ouput = {
      id: "123",
      name: "John Doe",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(ouput);
  });
});
