import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./dto";

export class FindProductUserCase {

  constructor(private readonly productRepository: ProductRepositoryInterface) { }

  execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    return this.productRepository.find(input.id)
  }
}
