import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./dto";

export class FindProductUserCase {

  constructor(private readonly productRepository: ProductRepositoryInterface) { }

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.productRepository.find(input.id)
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
