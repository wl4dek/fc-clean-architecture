import { CreateProductUserCase } from "./usecase";
const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
});

describe("Unit test for create product", () => {
  it("should create", async () => {
    const repository = MockRepository();
    const userCase = new CreateProductUserCase(repository);
    await userCase.execute({
      name: "Product Teste",
      price: 45,
    });
    expect(repository.create).toHaveBeenCalled();
  });
});

