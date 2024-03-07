import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Unit test for list customer use case", () => {
  let customer: Customer;
  let customer2: Customer;
  let MockRepository: () => CustomerRepositoryInterface;

  beforeEach(() => {
    customer = CustomerFactory.createWithAddress(
      "John Doe",
      new Address("Street 1", 1, "12345", "City")
    );
    customer2 = CustomerFactory.createWithAddress(
      "Jane Doe",
      new Address("Street 2", 2, "123456", "City 2")
    );
    MockRepository = () => {
      return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest
          .fn()
          .mockReturnValue(Promise.resolve([customer, customer2])),
      };
    };
  });

  it("should list a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);
    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer.id);
    expect(output.customers[0].name).toBe(customer.name);
    expect(output.customers[0].address.street).toBe(customer.Address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
  });
});
