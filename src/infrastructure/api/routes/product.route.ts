import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (request: Request, response: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new CreateProductUseCase(productRepository);
  try {
    const productDto = {
      name: request.body.name,
      price: request.body.price,
      type: request.body.type,
    };
    const output = await usecase.execute(productDto);
    response.send(output);
  } catch (error) {
    response.status(500).send(error);
  }
});

productRoute.get("/", async (request: Request, response: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new ListProductUseCase(productRepository);
  try {
    const output = await usecase.execute({});
    response.send(output);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});
