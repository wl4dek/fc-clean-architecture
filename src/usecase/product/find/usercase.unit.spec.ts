import ProductFactory from "../../../domain/product/factory/product.factory"
import { FindProductUserCase } from "./usercase"

const MockProduct = ProductFactory.create("a", "Product Mock", 25.00)

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(MockProduct),
  update: jest.fn(),
  findAll: jest.fn(),
})


describe("Unit test for find product", () => {
  it("should find product by id", async () => {
    const repository = MockRepository()
    const userCase = new FindProductUserCase(repository)
    const output = await userCase.execute({ id: MockProduct.id })

    expect(output).toBe(MockProduct)
  })
})
