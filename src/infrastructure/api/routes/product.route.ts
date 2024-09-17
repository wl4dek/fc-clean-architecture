import express, { Request, Response } from "express";
import { CreateProductUserCase } from "../../../usecase/product/create/usecase";
import { ListProductUserCase } from "../../../usecase/product/list/usercase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();
const productRepository = new ProductRepository()

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUserCase(productRepository);
  try {
    const productDTO = {
      name: req.body.name,
      price: req.body.price
    };
    await usecase.execute(productDTO);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUserCase(productRepository);
  const output = await usecase.execute(req.params);
  res.status(200)
  res.format({
    json: async () => res.send(output),
    // xml: async () => res.send(CustomerPresenter.listXML(output)),
  });
});
