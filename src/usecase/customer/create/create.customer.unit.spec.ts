import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto } from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Unit test create customer use case", () => {
  let input: InputCreateCustomerDto;
  let MockRepository: () => CustomerRepositoryInterface;

  beforeEach(() => {
    input = {
      name: "John Doe",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
      },
    };
    MockRepository = () => {
      return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      };
    };
  });

  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);
    input.name = "";
    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);
    input.address.street = "";
    await expect(usecase.execute(input)).rejects.toThrow("Street is required");
  });
});
