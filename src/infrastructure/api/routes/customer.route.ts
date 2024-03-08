import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

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

customerRoute.get("/", async (request: Request, response: Response) => {
  const customerRepository = new CustomerRepository();
  const usecase = new ListCustomerUseCase(customerRepository);
  const output = await usecase.execute({});
  response.format({
    json: async () => response.send(output),
    xml: async () => response.send(CustomerPresenter.listXML(output)),
  });
});
