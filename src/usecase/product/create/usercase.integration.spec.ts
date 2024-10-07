import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUserCase } from "./usecase";

describe("Test create product use case integration", () => {
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

    it("should create a product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUserCase(repository);
        const input = {
            name: "Product test",
            price: 45.50,
        }
        await usecase.execute(input);
        const result = await repository.findAll()

        expect(result).toHaveLength(1)
    });
});
