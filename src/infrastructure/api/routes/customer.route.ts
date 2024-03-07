import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (request: Request, response: Response) => {
  const customerRepository = new CustomerRepository();
  const usecase = new CreateCustomerUseCase(customerRepository);
  try {
    const customerDto = {
      name: request.body.name,
      address: {
        street: request.body.address.street,
        city: request.body.address.city,
        number: request.body.address.number,
        zip: request.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    response.send(output);
  } catch (error) {
    response.status(500).send(error);
  }
});
