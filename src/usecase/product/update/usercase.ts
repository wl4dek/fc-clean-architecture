import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO } from "./dto";

export class UpdateProductUserCase {

  constructor(private readonly productRepository: ProductRepositoryInterface) { }

  execute(input: InputUpdateProductDTO): Promise<void> {
    const produt = new Product(input.id, input.name, input.price)
    return this.productRepository.update(produt)
  }
}
