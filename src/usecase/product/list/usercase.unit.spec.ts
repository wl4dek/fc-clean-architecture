
import ProductFactory from "../../../domain/product/factory/product.factory"
import { ListProductUserCase } from "./usercase"

const MockProduct = ProductFactory.create("a", "Product Mock", 25.00)
const MockProduct2 = ProductFactory.create("a", "Product Mock 2", 45.00)

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(MockProduct),
  update: jest.fn(),
  findAll: jest.fn().mockResolvedValue([MockProduct, MockProduct2]),
})

const ProductsExpected = [
  { id: MockProduct.id, name: MockProduct.name, price: MockProduct.price },
  { id: MockProduct2.id, name: MockProduct2.name, price: MockProduct2.price },
]

describe("Unit test for list product", () => {
  it("should list products", async () => {
    const repository = MockRepository()
    const userCase = new ListProductUserCase(repository)
    const output = await userCase.execute({})

    expect(output.products.length).toBeLessThanOrEqual(2)
    expect(output.products).toEqual(ProductsExpected)
  })
})
