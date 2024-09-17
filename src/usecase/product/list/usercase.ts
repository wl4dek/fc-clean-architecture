import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./dto";

export class ListProductUserCase {

  constructor(private readonly productRepository: ProductRepositoryInterface) { }

  async execute(_input: InputListProductDTO): Promise<OutputListProductDTO> {
    const result = await this.productRepository.findAll()
    return OutputMapper.toOutput(result)
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDTO {
    const producList = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }))
    return { products: producList }
  }
}
