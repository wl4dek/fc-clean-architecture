import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { FindProductUserCase } from "./usercase";

describe("Test find product use case integration", () => {
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

    it("should find a product", async () => {
        const repository = new ProductRepository();
        const usecase = new FindProductUserCase(repository);
        const product = new Product("1234", "Teste product", 45.90)
        await repository.create(product)
        const input = { id: "1234" }
        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: '1234',
            name: 'Teste product',
            price: 45.90,
        })
    });
});
