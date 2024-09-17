import ProductFactory from "../../../domain/product/factory/product.factory"
import { UpdateProductUserCase } from "./usercase"

const MockProduct = ProductFactory.create("a", "Product Mock", 25.00)

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(MockProduct),
  update: jest.fn(),
  findAll: jest.fn().mockResolvedValue([MockProduct]),
})

describe("Unit test for list product", () => {
  it("should list products", async () => {
    const repository = MockRepository()
    const userCase = new UpdateProductUserCase(repository)
    const output = await userCase.execute({
      id: MockProduct.id,
      name: "Change Product Mock Name",
      price: 50.00
    })

    expect(output).toBeUndefined()
    expect(repository.update).toHaveBeenCalled()
  })
})
