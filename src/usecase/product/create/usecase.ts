import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO } from "./dto";
import ProductFactory from "./../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

export class CreateProductUserCase {

  constructor(private readonly productRepository: ProductRepositoryInterface) { }

  execute(input: InputCreateProductDTO): Promise<void> {
    const product = ProductFactory.create("a", input.name, input.price) as Product
    return this.productRepository.create(product)
  }
}
