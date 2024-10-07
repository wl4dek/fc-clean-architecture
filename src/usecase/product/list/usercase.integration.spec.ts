import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { ListProductUserCase } from "./usercase";

describe("Test list product use case integration", () => {
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

    it("should list all products", async () => {
        const repository = new ProductRepository();
        const usecase = new ListProductUserCase(repository);
        const product = new Product("1234", "Teste product", 45.90)
        await repository.create(product)
        const result = await usecase.execute({});
        expect(result.products).toHaveLength(1);
        const product2 = new Product("4321", "Teste product 2", 45.90)
        await repository.create(product2)
        const result2 = await usecase.execute({});
        expect(result2.products).toHaveLength(2);
    });
});
