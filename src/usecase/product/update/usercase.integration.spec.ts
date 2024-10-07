import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { UpdateProductUserCase } from "./usercase";


describe("Test update product use case integration", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const repository = new ProductRepository();
        const usecase = new UpdateProductUserCase(repository);
        const product = new Product("1234", "Teste product", 45.90)
        await repository.create(product)
        const produt = await repository.find("1234")
        expect({
            id: produt.id,
            name: produt.name,
            price: produt.price,
        }).toEqual({
            id: "1234",
            name: "Teste product",
            price: 45.90,
        })
        await usecase.execute({
            id: "1234",
            name: "update product",
            price: 45,
        });
        const result = await repository.find("1234")
        expect({
            id: result.id,
            name: result.name,
            price: result.price,
        }).toEqual({
            id: "1234",
            name: "update product",
            price: 45,
        })
    });
});
